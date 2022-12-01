import {Kafka} from "kafkajs";
import Http2Client from "../../http2/Http2Client";
import {Message} from "cloudevents/dist/message";
import {CloudEvent, emitterFor, Mode} from "cloudevents";
import {ValueType, ZeebeRecord} from "@hauptmedia/zeebe-exporter-types/dist/esm";

export class HttpSender {
    start() {

        const kafka = new Kafka({
            clientId: 'zeebe-connector',
            brokers: ['localhost:9092']
        })

        const consumer = kafka.consumer({groupId: 'zeebe-connector'})

        const http2Session = Http2Client.connect("https://127.0.0.1:4000");
        http2Session.on('reconnect', (connectionAttemptNumber, reconnectDelay) => {
            console.log(`[http/2] session reconnect, attempt #${connectionAttemptNumber} scheduled in ${reconnectDelay}ms`);
        });

        http2Session.on('connect', () => {
            console.log('[http/2] session connected');
        });

        http2Session.on('error', (err) => {
            console.error(`[http/2] error code: ${err.code}, syscall: ${err.syscall}, address: ${err.address}, port: ${err.port}`);
        });

        const http2Sender = async(message: Message) => {
            const req = http2Session.request({
                ':method': "POST",
                ':path': `/events`,
                ...message.headers
                //'authorization': `Bearer ${access_token}`,
            });
            req.write(message.body);
            req.end();
        }

        const emit = emitterFor(http2Sender, { mode: Mode.BINARY });

        const run = async () => {
            await consumer.connect()
            await consumer.subscribe({topic: "zeebe"})

            await consumer.run({
                eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
                    if (!message.value)
                        return;

                    const payloadAsString = message.value.toString();
                    console.log(payloadAsString);
                    if (!http2Session.connected) {
                        const resume = pause();
                        http2Session.once('connect', resume);
                        throw "[http/2] session is not connected";

                    } else {
                        const zeebeRecord = JSON.parse(payloadAsString) as ZeebeRecord<ValueType>,
                            type = `io.zeebe.${zeebeRecord.recordType.toLowerCase()}.${zeebeRecord.valueType.toLowerCase()}.${zeebeRecord.intent.toLowerCase()}`;

                        emit(new CloudEvent({
                            type,
                            source: "source",
                            data: zeebeRecord.value
                        }));
                    }

                    console.log(`[kafka] processed ${topic}/${partition}/${message.offset}`);
                },
            })
        }

        run().catch(console.error)
    }
}
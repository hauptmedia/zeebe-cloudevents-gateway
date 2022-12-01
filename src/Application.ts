import dotenv from "dotenv";
import {Kafka} from 'kafkajs';
import Http2Client from "./http2/Http2Client";

import { emitterFor, Mode, CloudEvent } from "cloudevents";
import {Message} from "cloudevents/dist/message";
import {Options} from "cloudevents/dist/transport/emitter";
import {ValueType, ZeebeRecord} from "@hauptmedia/zeebe-exporter-types";
import {Command} from "commander";
import {HttpServer} from "./consumer/HttpServer";

dotenv.config();

export class Application {
    run() {

        const program = new Command()
            .description('Zeebe Cloudevents Gateway')
            .option('--insecure', 'Allow self-signed TLS certificates', false);

        program.parse();
        const options = program.opts();

        if(options['insecure'])
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

        const ceConsumer = new HttpServer();
        ceConsumer.start();

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
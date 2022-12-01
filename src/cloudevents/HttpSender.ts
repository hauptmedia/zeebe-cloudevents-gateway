import Http2Client from "../http2/Http2Client";
import {Message} from "cloudevents/dist/message";
import {CloudEvent, emitterFor, Mode} from "cloudevents";
import {ValueType, ZeebeRecord} from "@hauptmedia/zeebe-exporter-types";
import {ConsumerInterface} from "../consumer/ConsumerInterface";

export interface HttpSenderOptions {
    insecure: boolean;
    endpoint: string;
    source: 'kafka' | 'hazelcast';
}

export class HttpSender {
    protected consumer: ConsumerInterface;
    protected options: HttpSenderOptions;

    constructor(consumer: ConsumerInterface, options: HttpSenderOptions) {
        this.options = options;

        if(options.insecure)
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

        this.consumer = consumer;
    }

    start() {
        const endpoint = new URL(this.options.endpoint);
        const http2Session = Http2Client.connect(`${endpoint.protocol}//${endpoint.host}`);

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
                ':path': endpoint.pathname,
                ...message.headers
                //'authorization': `Bearer ${access_token}`,
            });
            req.write(message.body);
            req.end();
        }

        const emit = emitterFor(http2Sender, { mode: Mode.BINARY });

        this.consumer.start((data, pause) =>{

            if (!http2Session.connected) {
                const resume = pause();
                http2Session.once('connect', resume);
                throw "[http/2] session is not connected";

            } else {
                const zeebeRecord = JSON.parse(data) as ZeebeRecord<ValueType>,
                    type = `io.zeebe.${zeebeRecord.recordType.toLowerCase()}.${zeebeRecord.valueType.toLowerCase()}.${zeebeRecord.intent.toLowerCase()}`;

                emit(new CloudEvent({
                    type,
                    source: "source",
                    data: zeebeRecord.value
                }));
            }
        });
    }
}
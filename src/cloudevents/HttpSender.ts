import Http2Client from "../http2/Http2Client";
import {Message} from "cloudevents/dist/message";
import {emitterFor, Mode} from "cloudevents";
import {ValueType, ZeebeRecord} from "@hauptmedia/zeebe-exporter-types";
import {ConsumerInterface} from "../consumer/ConsumerInterface";
import {generateCloudEvent} from "../zeebe/ZeebeCloudeventsFactory";

export interface HttpSenderOptions {
    secure: boolean;
    endpoint: string;
    source: 'kafka' | 'hazelcast';
}

export class HttpSender {
    protected consumer: ConsumerInterface;
    protected options: HttpSenderOptions;

    constructor(consumer: ConsumerInterface, options: HttpSenderOptions) {
        this.options = options;

        if(!options.secure)
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

        this.consumer = consumer;
    }

    start() {
        if(!this.options.endpoint) {
            console.error(`[httpSender] no http endpoint specified, define one via config file or via CLOUDEVENTS_HTTP_SENDER_ENDPOINT environment variable`)
            return;
        }
        console.log(`[httpSender] using endpoint ${this.options.endpoint}`)
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

                const zeebeRecord = JSON.parse(data) as ZeebeRecord<ValueType>;
                emit(generateCloudEvent(zeebeRecord))
            }
        });
    }
}
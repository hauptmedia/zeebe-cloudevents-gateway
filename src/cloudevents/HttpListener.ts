import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {CloudeventsHandler} from "./CloudeventsHandler";
import {createServer} from "http2";

interface HttpServerOptions {
    port: number;
    host: string;
    allowHTTP1: boolean;
    insecure: boolean;
    cert: string;
    key: string;
}

export class HttpListener {
    protected cloudeventsHandler: CloudeventsHandler;
    protected options: HttpServerOptions;

    constructor(cloudeventsHandler: CloudeventsHandler, options: HttpServerOptions) {
        this.options = options;
        this.cloudeventsHandler = cloudeventsHandler;
    }

    start() {
        let server;

        if(this.options.insecure)
            server = createServer();
        else
            server = createSecureServer({
                cert: this.options.cert,
                key: this.options.key,
                allowHTTP1: this.options.allowHTTP1
            });


        server.on('request', async (req, res) => {
            const chunks = [];

            for await (const chunk of req) {
                chunks.push(Buffer.from(chunk));
            }

            const body = Buffer.concat(chunks).toString("utf-8");

            try {
                this.cloudeventsHandler.handle(req.headers, body, res);

            } catch (e) {
                console.error(e);
            }
        });

        server.listen({
            port: this.options.port,
            host: this.options.host
        }, () => {
            console.info(`[httpListener] is running on https://${this.options.host}:${this.options.port}`)
        });

    }
}

import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {CloudeventsHandler} from "./CloudeventsHandler";

export class HttpServer {
    protected cloudeventsHandler: CloudeventsHandler;

    constructor() {
        this.cloudeventsHandler = new CloudeventsHandler();
    }

    start() {
        const port = 7777,
            host = "0.0.0.0";

        const server = createSecureServer({
            cert: readFileSync("certs/localhost-cert.pem"),
            key: readFileSync("certs/localhost-privkey.pem"),
            allowHTTP1: true
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
            port, host
        }, () => {
            console.info(`Server is running on https://${host}:${port}`)
        });

    }
}

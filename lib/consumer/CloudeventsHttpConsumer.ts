import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {HTTP} from "cloudevents";
import {GatewayClient} from "@hauptmedia/zeebe-gateway-types";
import {ChannelCredentials} from "@grpc/grpc-js";
import {cloudEventHandler} from "./cloudEventHandler";

export class CloudeventsHttpConsumer {
    start() {
        const port = 7777,
            host = "0.0.0.0";

        const server = createSecureServer({
            cert: readFileSync("certs/localhost-cert.pem"),
            key: readFileSync("certs/localhost-privkey.pem"),
            allowHTTP1: true
        });

        const zbc = new GatewayClient("localhost:26500", ChannelCredentials.createInsecure());

        server.on('request', async (req, res) => {
            const chunks = [];

            for await (const chunk of req) {
                chunks.push(Buffer.from(chunk));
            }

            const body = Buffer.concat(chunks).toString("utf-8");

            try {
                const receivedEvent = HTTP.toEvent<object>({headers: req.headers, body: body});

                if (Array.isArray(receivedEvent)) {
                    //     const cloudEventResponse = await receivedEvent.forEach(cloudEventHandler);
                    //     console.log(cloudEventResponse);

                } else {

                    const cloudEventResponse = await cloudEventHandler(zbc, receivedEvent);

                    res.writeHead(200);
                    res.write(JSON.stringify(cloudEventResponse));
                    res.end();

                    console.log(cloudEventResponse);

                }

            } catch (e) {
                console.error(e);
            }
            res.end();

        });

        server.listen({
            port, host
        }, () => {
            console.info(`Server is running on https://${host}:${port}`)
        });

    }
}

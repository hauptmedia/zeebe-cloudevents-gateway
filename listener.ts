import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {CloudEventV1, HTTP} from "cloudevents";
import {ZBClient} from "zeebe-node";

const port = 7777,
    host = "0.0.0.0";

const server = createSecureServer({
    cert: readFileSync("certs/localhost-cert.pem"),
    key: readFileSync("certs/localhost-privkey.pem"),
    allowHTTP1: true
});

const zbc = new ZBClient("http://localhost:26500");

const cloudEventHandler = async (cloudevent: CloudEventV1<any>) => {

    switch(cloudevent.type) {
        case 'io.zeebe.command.deploy_resource':
            await zbc.deployResource({
                name: 'test.bpmn',
                process: Buffer.from(cloudevent.data)
            })
            break;

    }
}

server.on('request', async(req, res) => {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(Buffer.from(chunk));
    }

    const body = Buffer.concat(chunks).toString("utf-8"),
        receivedEvent = HTTP.toEvent<object>({ headers: req.headers, body: body });

    if (Array.isArray(receivedEvent))
        receivedEvent.forEach(cloudEventHandler);
    else
        cloudEventHandler(receivedEvent);

    res.end();

});

server.listen({
    port, host
}, () => {
    console.info(`Server is running on https://${host}:${port}`)
});

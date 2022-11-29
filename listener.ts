import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {CloudEventV1, HTTP} from "cloudevents";
import {ZBClient} from "zeebe-node";
import Ajv from "ajv"
import {DeployResourceRequest, ZeebeGatewayCommandJsonSchemaRegistry} from "@hauptmedia/zeebe-gateway-types";

const ajv = new Ajv()

const port = 7777,
    host = "0.0.0.0";

const server = createSecureServer({
    cert: readFileSync("certs/localhost-cert.pem"),
    key: readFileSync("certs/localhost-privkey.pem"),
    allowHTTP1: true
});

const zbc = new ZBClient("http://localhost:26500");

const typedValidate = <T>(schema: object, data: T): T => {
    const validate = ajv.compile<T>(schema),
        isValid = validate(data);

    if (!isValid)
        throw validate.errors;

    return data;
}

const cloudEventHandler = async (cloudevent: CloudEventV1<any>) => {
    type typeScriptType = 'io.zeebe.command.v1.ActivateJobs';

    const type = cloudevent.type as typeScriptType,
        schema = ZeebeGatewayCommandJsonSchemaRegistry[type];

    if(!schema)
        throw "Unknown type " + cloudevent.type;

    switch(cloudevent.type) {
        case 'io.zeebe.command.v1.DeployResource':
            console.log(cloudevent.data);

            const data = typedValidate<DeployResourceRequest>(schema, cloudevent.data);
            return Promise.all(data.resources.map(resource => {
                    return zbc.deployResource({
                        name: resource.name,
                        process: Buffer.from(resource.content)
                    });
            }));

    }
}

server.on('request', async(req, res) => {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(Buffer.from(chunk));
    }

    const body = Buffer.concat(chunks).toString("utf-8"),
        receivedEvent = HTTP.toEvent<object>({ headers: req.headers, body: body });

    try {
        if (Array.isArray(receivedEvent))
            await receivedEvent.forEach(cloudEventHandler);
        else
            await cloudEventHandler(receivedEvent);

    } catch(e) {
        console.error(e);
    }
    res.end();

});

server.listen({
    port, host
}, () => {
    console.info(`Server is running on https://${host}:${port}`)
});

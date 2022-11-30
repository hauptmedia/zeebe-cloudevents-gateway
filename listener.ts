import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {CloudEventV1, HTTP} from "cloudevents";
import Ajv from "ajv"
import {
    CreateProcessInstanceRequest,
    DeployResourceRequest,
    ZeebeGatewayCommandJsonSchemaRegistry, ZeebeGatewayCommandTypes, DeployResourceResponse, GatewayClient
} from "@hauptmedia/zeebe-gateway-types";
import {ChannelCredentials, ClientOptions, ServiceError} from "@grpc/grpc-js";

const ajv = new Ajv()

const port = 7777,
    host = "0.0.0.0";

const server = createSecureServer({
    cert: readFileSync("certs/localhost-cert.pem"),
    key: readFileSync("certs/localhost-privkey.pem"),
    allowHTTP1: true
});

const zbc = new GatewayClient("localhost:26500", ChannelCredentials.createInsecure());

const typedValidate = <T>(schema: object, data: T): T => {
    const validate = ajv.compile<T>(schema),
        isValid = validate(data);

    if (!isValid)
        throw validate.errors;

    return data;
}

const cloudEventHandler = async (cloudevent: CloudEventV1<any>) => {
    const type = cloudevent.type as ZeebeGatewayCommandTypes,
        schema = ZeebeGatewayCommandJsonSchemaRegistry[type];

    if(!schema)
        throw "Unknown type " + cloudevent.type;

    let data;

    switch(cloudevent.type) {
        case 'io.zeebe.command.v1.DeployResourceRequest':
            console.log(cloudevent.data);
          //  data = typedValidate<DeployResourceRequest>(schema, cloudevent.data);

            const req = DeployResourceRequest.fromJSON(cloudevent.data);
            console.log(req);
            zbc.deployResource(req, (error: ServiceError | null, response: DeployResourceResponse) => {
                console.log(error);
                console.log(response);

            });

/*        case 'io.zeebe.command.v1.CreateProcessInstance':
            data = typedValidate<CreateProcessInstanceRequest>(schema, cloudevent.data);
            return zbc.createProcessInstance({
                bpmnProcessId: data.bpmnProcessId,
                variables: data.variables,
                version: data.version
            });*/
    }
}

server.on('request', async(req, res) => {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(Buffer.from(chunk));
    }

    const body = Buffer.concat(chunks).toString("utf-8");

    try {
        const receivedEvent = HTTP.toEvent<object>({ headers: req.headers, body: body });

        if (Array.isArray(receivedEvent)) {
            const res = await receivedEvent.forEach(cloudEventHandler);
            console.log(res);

        } else {

            const res = await cloudEventHandler(receivedEvent);
            console.log(res);

        }

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

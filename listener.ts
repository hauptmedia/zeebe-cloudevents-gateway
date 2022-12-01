import {createSecureServer} from "node:http2";
import {readFileSync} from "node:fs";
import {CloudEvent, CloudEventV1, HTTP} from "cloudevents";
import Ajv from "ajv"
import {
    CreateProcessInstanceRequest,
    DeployResourceRequest,
    ZeebeGatewayCommandJsonSchemaRegistry, ZeebeGatewayCommandTypes, DeployResourceResponse, GatewayClient
} from "@hauptmedia/zeebe-gateway-types";
import {ChannelCredentials, ClientOptions, ClientUnaryCall, ServiceError} from "@grpc/grpc-js";
import {ProcessInstanceCreationIntent} from "@hauptmedia/zeebe-exporter-types";

const ajv = new Ajv()

const port = 7777,
    host = "0.0.0.0";

const server = createSecureServer({
    cert: readFileSync("certs/localhost-cert.pem"),
    key: readFileSync("certs/localhost-privkey.pem"),
    allowHTTP1: true
});

const zbc = new GatewayClient("localhost:26500", ChannelCredentials.createInsecure());

interface JSONConvertible {
    fromJSON(object: any): DeployResourceRequest;
    toJSON(message: DeployResourceRequest): unknown;
}

const validate = <T>(schema: object, data: T): T => {
    const validate = ajv.compile<T>(schema),
        isValid = validate(data);

    if (!isValid) {
        throw validate.errors;
    }

    return data;
}

interface GRPCHandler {
    (request: any, callback: (error: ServiceError | null, response: any) => void): ClientUnaryCall
}

interface GRPCRequestFactory {
    fromJSON(object: any): any;
}

const handler = (grpcServiceFunction: GRPCHandler, grpcRequestFactory: GRPCRequestFactory, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const grpcRequest = grpcRequestFactory.fromJSON(data);

        grpcServiceFunction(grpcRequest, (error: ServiceError | null, response) => {
            if(error)
                reject(error)
            else
                resolve(response);
        });
    });
}

const handlerRegistry = {
    'io.zeebe.command.v1.DeployResourceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.deployResource.bind(zbc), DeployResourceRequest, data),

    'io.zeebe.command.v1.CreateProcessInstanceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.createProcessInstance.bind(zbc), CreateProcessInstanceRequest, data)

}

type testType = 'io.zeebe.command.v1.DeployResourceRequest'

const cloudEventHandler = async (cloudevent: CloudEventV1<any>): Promise<CloudEventV1<any>> => {
    const type = cloudevent.type as ZeebeGatewayCommandTypes,
        schema = ZeebeGatewayCommandJsonSchemaRegistry[type],
        handler = handlerRegistry[type as testType];

    if (!schema)
        throw "Unknown type " + cloudevent.type;

    const data = validate(schema, cloudevent.data);

    const responseData = await handler(zbc, data);

    return new CloudEvent({
        type: cloudevent.type.replace("Request", "Response"),
        source: 'source',
        response: responseData
    });
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
            const cloudEventResponse = await receivedEvent.forEach(cloudEventHandler);
            console.log(cloudEventResponse);

        } else {

            const cloudEventResponse = await cloudEventHandler(receivedEvent);

            res.writeHead(200);
            res.write(JSON.stringify(cloudEventResponse));
            res.end();

            console.log(cloudEventResponse);

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

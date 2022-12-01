import {CloudEvent, CloudEventV1} from "cloudevents";
import {
    GatewayClient,
    ZeebeGatewayCommandJsonSchemaRegistry,
    ZeebeGatewayCommandTypes
} from "@hauptmedia/zeebe-gateway-types";
import {GrpcHandlerRegistry, GrpcHandlerRegistryTypes} from "./GrpcHandlerRegistry";
import Ajv from "ajv";

const ajv = new Ajv()

const schemaValidator = <T>(schema: object, data: T): T => {
    const validate = ajv.compile<T>(schema),
        isValid = validate(data);

    if (!isValid) {
        throw validate.errors;
    }

    return data;
}

export const cloudEventHandler = async (zbc: GatewayClient, cloudevent: CloudEventV1<any>): Promise<CloudEventV1<any>> => {
    // @ts-ignore
    const type  = cloudevent.type,
        schema  = ZeebeGatewayCommandJsonSchemaRegistry[type as ZeebeGatewayCommandTypes],
        handler = GrpcHandlerRegistry[type as GrpcHandlerRegistryTypes];

    if (!schema)
        throw "Unknown type " + cloudevent.type;

    const data = schemaValidator(schema, cloudevent.data);

    const responseData = await handler(zbc, data);

    return new CloudEvent({
        type: cloudevent.type.replace("Request", "Response"),
        source: 'source',
        response: responseData
    });
}

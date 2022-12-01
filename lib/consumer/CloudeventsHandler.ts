import {CloudEvent, CloudEventV1, HTTP} from "cloudevents";
import Ajv from "ajv";
import {GrpcHandler} from "./GrpcHandler";
import {Http2ServerResponse, IncomingHttpHeaders} from "http2";

const ajv = new Ajv()

const schemaValidator = <T>(schema: object, data: T): T => {
    const validate = ajv.compile<T>(schema),
        isValid = validate(data);

    if (!isValid) {
        throw validate.errors;
    }

    return data;
}

export class CloudeventsHandler {
    protected grpcHandler: GrpcHandler;

    constructor() {
        this.grpcHandler = new GrpcHandler();
    }

    async handle(headers: IncomingHttpHeaders, body: string, res: Http2ServerResponse): Promise<void> {
        const cloudevent = HTTP.toEvent<object>({headers, body});

        if (Array.isArray(cloudevent)) {
            //     const cloudEventResponse = await receivedEvent.forEach(cloudEventHandler);
            //     console.log(cloudEventResponse);

        } else {

            const responseData = await this.grpcHandler.handle(cloudevent.type, cloudevent.data);

            const responseCloudevent = new CloudEvent({
                type: cloudevent.type.replace("Request", "Response"),
                source: 'source',
                response: responseData
            });


            res.writeHead(200);
            res.write(JSON.stringify(responseCloudevent));
            res.end();
        }

        //const data = schemaValidator(schema, cloudevent.data);

    }
}

import {CloudEvent, CloudEventV1, HTTP} from "cloudevents";
import Ajv from "ajv";
import {ZeebeClient} from "../zeebe/ZeebeClient";
import {Http2ServerResponse, IncomingHttpHeaders} from "http2";
import {RejectionType} from "@hauptmedia/zeebe-exporter-types";

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
    protected zbc: ZeebeClient;

    constructor(zbc: ZeebeClient) {
        this.zbc = zbc;
    }

    async _handleCloudevent(cloudevent: CloudEventV1<any>): Promise<CloudEventV1<any>> {
        //TODO: validate JSON Schema const data = schemaValidator(schema, cloudevent.data);
        try {

            const grpcType = cloudevent.type.replace("io.zeebe.command.v1.", "");
            const responseData = await this.zbc.request(grpcType, cloudevent.data);

            return new CloudEvent({
                type: cloudevent.type.replace("Request", "Response"),
                source: 'source',
                response: responseData
            });

        } catch(e: any) {
            const matches = e.details.match(/Command '(.*)' rejected with code '(.*)': (.*)/);
            let
                rejectionType = "UNKNOWN",
                rejectionReason = e.toString(),
                ceType = cloudevent.type
                    .replace("command", "commandRejection")
                    .replace("ActivateJobsRequest", "JobBatch");

            if (matches) {
                const intent = matches[1];
                rejectionType = matches[2];
                rejectionReason = matches[3];
                ceType += "." + intent.toLowerCase();
            }

            return new CloudEvent({
                type: ceType,
                source: 'source',
                response: {
                    'rejectionType': rejectionType,
                    'rejectionReason': rejectionReason
                }
            });
        }
    }

    async handle(headers: IncomingHttpHeaders, body: string, res: Http2ServerResponse): Promise<void> {
        const cloudevent = HTTP.toEvent<any>({headers, body});

        let response;

        if (Array.isArray(cloudevent))
            response = await Promise.all(cloudevent.map(async ce => await this._handleCloudevent(ce)));
        else
            response = await this._handleCloudevent(cloudevent);

        res.writeHead(200);
        res.write(JSON.stringify(response));
        res.end();
    }
}

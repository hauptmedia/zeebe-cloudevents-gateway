import {ZeebeRecord} from "@hauptmedia/zeebe-exporter-types/dist/esm";
import {CloudEvent} from "cloudevents";

const toCamelCase = (input: string, firstCharUppercase: boolean) => {
    let returnValue = input.toLowerCase()
        .replace(/_./g, m => m[1].toUpperCase());

    if(firstCharUppercase)
        returnValue = returnValue.replace(/^./, str => str.toUpperCase());

    return returnValue;
}

const generateCloudeventsType = (record: ZeebeRecord<any>): string => {
    const
        recordType = toCamelCase(record.recordType, false),
        valueType = toCamelCase(record.valueType, true),
        intent = toCamelCase(record.intent, false);

    return `io.zeebe.${recordType}.v1.${valueType}.${intent}`
}

export const generateCloudEvent = (record: ZeebeRecord<any>): CloudEvent => {
    const type = generateCloudeventsType(record);

    if(type.startsWith("io.zeebe.commandRejection")) {
        //generate rejection cloud event
        return new CloudEvent<any>({
            type,
            source: "source",
            data: {
                rejectionType: record.rejectionType,
                rejectionReason: record.rejectionReason,
                value: record.value
            }
        });

    } else {
        return new CloudEvent<any>({
            type,
            source: "source",
            data: record.value
        });
    }
}
import {ZeebeRecord} from "@hauptmedia/zeebe-exporter-types/dist/esm";

const toCamelCase = (input: string, firstCharUppercase: boolean) => {
    let returnValue = input.toLowerCase()
        .replace(/_./g, m => m[1].toUpperCase());

    if(firstCharUppercase)
        returnValue = returnValue.replace(/^./, str => str.toUpperCase());

    return returnValue;
}

export const generateCloudeventsType = (record: ZeebeRecord<any>): string => {
    const
        recordType = toCamelCase(record.recordType, false),
        valueType = toCamelCase(record.valueType, true),
        intent = toCamelCase(record.intent, false);

    return `io.zeebe.${recordType}.v1.${valueType}.${intent}`
}

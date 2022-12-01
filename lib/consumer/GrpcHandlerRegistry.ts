import {
    CompleteJobRequest,
    CreateProcessInstanceRequest, CreateProcessInstanceWithResultRequest,
    DeployResourceRequest, FailJobRequest,
    GatewayClient,
    ModifyProcessInstanceRequest,
    PublishMessageRequest,
    ResolveIncidentRequest,
    SetVariablesRequest,
    ThrowErrorRequest,
    TopologyRequest,
    UpdateJobRetriesRequest
} from "@hauptmedia/zeebe-gateway-types";
import {ClientUnaryCall, ServiceError} from "@grpc/grpc-js";

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
            if (error)
                reject(error);
            else
                resolve(response);
        });
    });
}

export const GrpcHandlerRegistry = {
    'io.zeebe.command.v1.CancelProcessInstanceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.cancelProcessInstance.bind(zbc), CompleteJobRequest, data),

    'io.zeebe.command.v1.CompleteJobRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.completeJob.bind(zbc), CompleteJobRequest, data),

    'io.zeebe.command.v1.CreateProcessInstanceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.createProcessInstance.bind(zbc), CreateProcessInstanceRequest, data),

    'io.zeebe.command.v1.CreateProcessInstanceWithResultRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.createProcessInstanceWithResult.bind(zbc), CreateProcessInstanceWithResultRequest, data),

    'io.zeebe.command.v1.DeployResourceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.deployResource.bind(zbc), DeployResourceRequest, data),

    'io.zeebe.command.v1.FailJobRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.failJob.bind(zbc), FailJobRequest, data),

    'io.zeebe.command.v1.ModifyProcessInstanceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.modifyProcessInstance.bind(zbc), ModifyProcessInstanceRequest, data),

    'io.zeebe.command.v1.PublishMessageRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.publishMessage.bind(zbc), PublishMessageRequest, data),

    'io.zeebe.command.v1.ResolveIncidentRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.resolveIncident.bind(zbc), ResolveIncidentRequest, data),

    'io.zeebe.command.v1.SetVariablesRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.setVariables.bind(zbc), SetVariablesRequest, data),

    'io.zeebe.command.v1.ThrowErrorRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.throwError.bind(zbc), ThrowErrorRequest, data),

    'io.zeebe.command.v1.TopologyRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.topology.bind(zbc), TopologyRequest, data),

    'io.zeebe.command.v1.UpdateJobRetriesRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.updateJobRetries.bind(zbc), UpdateJobRetriesRequest, data)
}

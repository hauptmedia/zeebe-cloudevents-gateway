import {
    CreateProcessInstanceRequest,
    DeployResourceRequest,
    GatewayClient,
    TopologyRequest
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
    'io.zeebe.command.v1.DeployResourceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.deployResource.bind(zbc), DeployResourceRequest, data),

    'io.zeebe.command.v1.CreateProcessInstanceRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.createProcessInstance.bind(zbc), CreateProcessInstanceRequest, data),

    'io.zeebe.command.v1.TopologyRequest': (zbc: GatewayClient, data: any) =>
        handler(zbc.topology.bind(zbc), TopologyRequest, data)

}

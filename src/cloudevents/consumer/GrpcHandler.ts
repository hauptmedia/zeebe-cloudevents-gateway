import {
    CompleteJobRequest,
    CreateProcessInstanceRequest,
    CreateProcessInstanceWithResultRequest,
    DeployResourceRequest,
    FailJobRequest,
    GatewayClient,
    ModifyProcessInstanceRequest,
    PublishMessageRequest,
    ResolveIncidentRequest,
    SetVariablesRequest,
    ThrowErrorRequest,
    TopologyRequest,
    UpdateJobRetriesRequest
} from "@hauptmedia/zeebe-gateway-types";
import {ChannelCredentials, ServiceError} from "@grpc/grpc-js";

interface GRPCRequestFactory {
    fromJSON(object: any): any;
}

export class GrpcHandler {
    protected zbc: GatewayClient;

    constructor() {
        this.zbc = new GatewayClient("localhost:26500", ChannelCredentials.createInsecure());
    }

    protected _handler(grpcServiceFunction: string, grpcRequestFactory: GRPCRequestFactory, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const grpcRequest = grpcRequestFactory.fromJSON(data);

            // @ts-ignore
            this.zbc[grpcServiceFunction](grpcRequest, (error: ServiceError | null, response) => {
                if (error)
                    reject(error);
                else
                    resolve(response);
            });
        });
    }

    handle(type: string, data: any) {
        switch (type) {
            case 'CancelProcessInstanceRequest':
                return this._handler('cancelProcessInstance', CompleteJobRequest, data);

            case 'CompleteJobRequest':
                return this._handler('completeJob', CompleteJobRequest, data);

            case 'CreateProcessInstanceRequest':
                return this._handler('createProcessInstance', CreateProcessInstanceRequest, data);

            case 'CreateProcessInstanceWithResultRequest':
                return this._handler('createProcessInstanceWithResult', CreateProcessInstanceWithResultRequest, data);

            case 'DeployResourceRequest':
                return this._handler('deployResource', DeployResourceRequest, data);

            case 'FailJobRequest':
                return this._handler('failJob', FailJobRequest, data);

            case 'ModifyProcessInstanceRequest':
                return this._handler('modifyProcessInstance', ModifyProcessInstanceRequest, data);

            case 'PublishMessageRequest':
                return this._handler('publishMessage', PublishMessageRequest, data);

            case 'ResolveIncidentRequest':
                return this._handler('resolveIncident', ResolveIncidentRequest, data);

            case 'SetVariablesRequest':
                return this._handler('setVariables', SetVariablesRequest, data);

            case 'ThrowErrorRequest':
                return this._handler('throwError', ThrowErrorRequest, data);

            case 'TopologyRequest':
                return this._handler('topology', TopologyRequest, data);

            case 'UpdateJobRetriesRequest':
                return this._handler('updateJobRetries', UpdateJobRetriesRequest, data)

            default:
                throw `Unsupported request type: ${data}`
        }
    }
}
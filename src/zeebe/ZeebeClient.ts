import {
    ActivateJobsRequest,
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

interface ClientOptions {
    gatewayAddress: string;
}

export class ZeebeClient {
    protected zbc: GatewayClient;

    constructor(options: ClientOptions) {
        this.zbc = new GatewayClient(options.gatewayAddress, ChannelCredentials.createInsecure());
    }

    protected _requestHandler(grpcServiceFunction: string, grpcRequestFactory: GRPCRequestFactory, data: any): Promise<any> {
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

    request(type: string, data: any) {
        switch (type) {
            case 'ActivateJobsRequest':
                return new Promise((resolve, reject) => {
                    const request = ActivateJobsRequest.fromJSON(data),
                           stream = this.zbc.activateJobs(request),
                           result: any[] = [];

                    stream.on('data', (data) => result.push(data['jobs']));
                    stream.on('end', () => resolve(result));
                    stream.on('error', (e) => reject(e));
                });
                break;

            case 'CancelProcessInstanceRequest':
                return this._requestHandler('cancelProcessInstance', CompleteJobRequest, data);

            case 'CompleteJobRequest':
                return this._requestHandler('completeJob', CompleteJobRequest, data);

            case 'CreateProcessInstanceRequest':
                return this._requestHandler('createProcessInstance', CreateProcessInstanceRequest, data);

            case 'CreateProcessInstanceWithResultRequest':
                return this._requestHandler('createProcessInstanceWithResult', CreateProcessInstanceWithResultRequest, data);

            case 'DeployResourceRequest':
                return this._requestHandler('deployResource', DeployResourceRequest, data);

            case 'FailJobRequest':
                return this._requestHandler('failJob', FailJobRequest, data);

            case 'ModifyProcessInstanceRequest':
                return this._requestHandler('modifyProcessInstance', ModifyProcessInstanceRequest, data);

            case 'PublishMessageRequest':
                return this._requestHandler('publishMessage', PublishMessageRequest, data);

            case 'ResolveIncidentRequest':
                return this._requestHandler('resolveIncident', ResolveIncidentRequest, data);

            case 'SetVariablesRequest':
                return this._requestHandler('setVariables', SetVariablesRequest, data);

            case 'ThrowErrorRequest':
                return this._requestHandler('throwError', ThrowErrorRequest, data);

            case 'TopologyRequest':
                return this._requestHandler('topology', TopologyRequest, data);

            case 'UpdateJobRetriesRequest':
                return this._requestHandler('updateJobRetries', UpdateJobRetriesRequest, data)

            default:
                throw `Unsupported request type: ${type}`
        }
    }
}
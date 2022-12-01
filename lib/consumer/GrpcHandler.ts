import {GatewayClient} from "@hauptmedia/zeebe-gateway-types";
import {ChannelCredentials, ClientUnaryCall, ServiceError} from "@grpc/grpc-js";
import {
    CompleteJobRequest,
    CreateProcessInstanceRequest,
    CreateProcessInstanceWithResultRequest,
    DeployResourceRequest,
    FailJobRequest,
    ModifyProcessInstanceRequest,
    PublishMessageRequest,
    ResolveIncidentRequest,
    SetVariablesRequest,
    ThrowErrorRequest,
    TopologyRequest,
    UpdateJobRetriesRequest
} from "@hauptmedia/zeebe-gateway-types";


interface GRPCHandler {
    (request: any, callback: (error: ServiceError | null, response: any) => void): ClientUnaryCall
}

interface GRPCRequestFactory {
    fromJSON(object: any): any;
}

export class GrpcHandler {
    protected zbc: GatewayClient;

    constructor() {
        this.zbc = new GatewayClient("localhost:26500", ChannelCredentials.createInsecure());
    }

    protected _handler(grpcServiceFunction: GRPCHandler, grpcRequestFactory: GRPCRequestFactory, data: any): Promise<any> {
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

    handle(type: string, data: any) {
        switch(type) {
            case 'CancelProcessInstanceRequest':
                return this._handler(this.zbc.cancelProcessInstance.bind(this.zbc), CompleteJobRequest, data);

            case 'CompleteJobRequest':
                return this._handler(this.zbc.completeJob.bind(this.zbc), CompleteJobRequest, data);

            case 'CreateProcessInstanceRequest':
                return this._handler(this.zbc.createProcessInstance.bind(this.zbc), CreateProcessInstanceRequest, data);

            case 'CreateProcessInstanceWithResultRequest':
                return this._handler(this.zbc.createProcessInstanceWithResult.bind(this.zbc), CreateProcessInstanceWithResultRequest, data);

            case 'DeployResourceRequest':
                return this._handler(this.zbc.deployResource.bind(this.zbc), DeployResourceRequest, data);

            case 'FailJobRequest':
                return this._handler(this.zbc.failJob.bind(this.zbc), FailJobRequest, data);

            case 'ModifyProcessInstanceRequest':
                return this._handler(this.zbc.failJob.bind(this.zbc), ModifyProcessInstanceRequest, data);

            case 'PublishMessageRequest':
                return this._handler(this.zbc.publishMessage.bind(this.zbc), PublishMessageRequest, data);

            case 'ResolveIncidentRequest':
                return this._handler(this.zbc.resolveIncident.bind(this.zbc), ResolveIncidentRequest, data);

            case 'SetVariablesRequest':
                return this._handler(this.zbc.setVariables.bind(this.zbc), SetVariablesRequest, data);

            case 'ThrowErrorRequest':
                return this._handler(this.zbc.throwError.bind(this.zbc), ThrowErrorRequest, data);

            case 'TopologyRequest':
                return this._handler(this.zbc.topology.bind(this.zbc), TopologyRequest, data);

            case 'UpdateJobRetriesRequest':
                return this._handler(this.zbc.updateJobRetries.bind(this.zbc), UpdateJobRetriesRequest, data)
        }
    }
}
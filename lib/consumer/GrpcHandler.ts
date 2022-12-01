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
            case 'io.zeebe.command.v1.CancelProcessInstanceRequest':
                return this._handler(this.zbc.cancelProcessInstance.bind(this.zbc), CompleteJobRequest, data);

            case 'io.zeebe.command.v1.CompleteJobRequest':
                return this._handler(this.zbc.completeJob.bind(this.zbc), CompleteJobRequest, data);

            case 'io.zeebe.command.v1.CreateProcessInstanceRequest':
                return this._handler(this.zbc.createProcessInstance.bind(this.zbc), CreateProcessInstanceRequest, data);

            case 'io.zeebe.command.v1.CreateProcessInstanceWithResultRequest':
                return this._handler(this.zbc.createProcessInstanceWithResult.bind(this.zbc), CreateProcessInstanceWithResultRequest, data);

            case 'io.zeebe.command.v1.DeployResourceRequest':
                return this._handler(this.zbc.deployResource.bind(this.zbc), DeployResourceRequest, data);

            case 'io.zeebe.command.v1.FailJobRequest':
                return this._handler(this.zbc.failJob.bind(this.zbc), FailJobRequest, data);

            case 'io.zeebe.command.v1.ModifyProcessInstanceRequest':
                return this._handler(this.zbc.failJob.bind(this.zbc), ModifyProcessInstanceRequest, data);

            case 'io.zeebe.command.v1.PublishMessageRequest':
                return this._handler(this.zbc.publishMessage.bind(this.zbc), PublishMessageRequest, data);

            case 'io.zeebe.command.v1.ResolveIncidentRequest':
                return this._handler(this.zbc.resolveIncident.bind(this.zbc), ResolveIncidentRequest, data);

            case 'io.zeebe.command.v1.SetVariablesRequest':
                return this._handler(this.zbc.setVariables.bind(this.zbc), SetVariablesRequest, data);

            case 'io.zeebe.command.v1.ThrowErrorRequest':
                return this._handler(this.zbc.throwError.bind(this.zbc), ThrowErrorRequest, data);

            case 'io.zeebe.command.v1.TopologyRequest':
                return this._handler(this.zbc.topology.bind(this.zbc), TopologyRequest, data);

            case 'io.zeebe.command.v1.UpdateJobRetriesRequest':
                return this._handler(this.zbc.updateJobRetries.bind(this.zbc), UpdateJobRetriesRequest, data)
        }
    }
}
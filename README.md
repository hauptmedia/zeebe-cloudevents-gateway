Zeebe Cloudevents Gateway
=========================
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

Maps Zeebe Event Protocol Records to [Cloudevents.io](https://cloudevents.io) compatible HTTP Endpoints.

# Zeebe Cloudevents Commands

This Cloudevents gateway consumes the following Cloudevents via the integrated http listener.
Any Cloudevent with a request type produces the corresponding response Cloudevent on the originating channel.
This is basically a thin translation layer for the Zeebe gRPC gateway protocol.

| Message Type                                                | Json Schema                                                                                                                         |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| io.zeebe.command.v1.ActivateJobsRequest                     | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ActivateJobsRequest.json)                   |
| io.zeebe.command.v1.ActivateJobsResponse                    | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ActivateJobsResponse.json)                  |
| io.zeebe.command.v1.CancelProcessInstanceRequest            | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CancelProcessInstanceRequest.json)          |
| io.zeebe.command.v1.CancelProcessInstanceResponse           | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CancelProcessInstanceResponse.json)         |
| io.zeebe.command.v1.CompleteJobRequest                      | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CompleteJobRequest.json)                    |
| io.zeebe.command.v1.CompleteJobResponse                     | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CompleteJobResponse.json)                   |
| io.zeebe.command.v1.CreateProcessInstanceRequest            | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CreateProcessInstanceRequest.json)          |
| io.zeebe.command.v1.CreateProcessInstanceResponse           | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CreateProcessInstanceResponse.json)         |
| io.zeebe.command.v1.CreateProcessInstanceWithResultRequest  | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CreateProcessInstanceWithResultRequest.json) |
| io.zeebe.command.v1.CreateProcessInstanceWithResultResponse | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/CreateProcessInstanceWithResultResponse.json) |
| io.zeebe.command.v1.DeployResourceRequest                   | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/DeployResourceRequest.json)                 | 
| io.zeebe.command.v1.DeployResourceResponse                  | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/DeployResourceResponse.json)                |
| io.zeebe.command.v1.FailJobRequest                          | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/FailJobRequest.json)                        |
| io.zeebe.command.v1.FailJobResponse                         | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/FailJobResponse.json)                       |
| io.zeebe.command.v1.ModifyProcessInstanceRequest            | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ModifyProcessInstanceRequest.json)          |
| io.zeebe.command.v1.ModifyProcessInstanceResponse           | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ModifyProcessInstanceResponse.json)         |
| io.zeebe.command.v1.PublishMessageRequest                   | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/PublishMessageRequest.json)                 |
| io.zeebe.command.v1.PublishMessageResponse                  | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/PublishMessageResponse.json)                |
| io.zeebe.command.v1.ResolveIncidentRequest                  | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ResolveIncidentRequest.json)                |
| io.zeebe.command.v1.ResolveIncidentResponse                 | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ResolveIncidentResponse.json)               |
| io.zeebe.command.v1.SetVariablesRequest                     | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/SetVariablesRequest.json)                   |
| io.zeebe.command.v1.SetVariablesResponse                    | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/SetVariablesResponse.json)                  |
| io.zeebe.command.v1.ThrowErrorRequest                       | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ThrowErrorRequest.json)                     |
| io.zeebe.command.v1.ThrowErrorResponse                      | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/ThrowErrorResponse.json)                    |
| io.zeebe.command.v1.TopologyRequest                         | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/TopologyRequest.json)                       |
| io.zeebe.command.v1.TopologyResponse                        | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/TopologyResponse.json)                      |
| io.zeebe.command.v1.UpdateJobRetriesRequest                 | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/UpdateJobRetriesRequest.json)               |
| io.zeebe.command.v1.UpdateJobRetriesResponse                | [JSON Schema](https://hauptmedia.github.io/zeebe-gateway-types/jsonschema/UpdateJobRetriesResponse.json)              |

# Zeebe Cloudevents Events

## Decision

[Decision JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Decision.json)

| Event Type                         | Description |
|------------------------------------|-------------|
| io.zeebe.event.v1.Decision.created | TBD         |

## Decision Evaluation

[DecisionEvaluation JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/DecisionEvaluation.json)

| Event Type                                     | Description |
|------------------------------------------------|-------------|
| io.zeebe.event.v1.DecisionEvaluation.evaluated | TBD         |
| io.zeebe.event.v1.DecisionEvaluation.failed    | TBD         |

## Decision Requirements

[DecisionRequirements JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/DecisionRequirements.json)

| Event Type                                     | Description |
|------------------------------------------------|-------------|
| io.zeebe.event.v1.DecisionRequirements.created | TBD         |

## Deployment

[Deployment JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Deployment.json)

| Event Type                                    | Description |
|-----------------------------------------------|-------------|
| io.zeebe.event.v1.Deployment.create           | TBD         |
| io.zeebe.event.v1.Deployment.created          | TBD         |
| io.zeebe.event.v1.Deployment.distribute       | TBD         |
| io.zeebe.event.v1.Deployment.distributed      | TBD         |
| io.zeebe.event.v1.Deployment.fullyDistributed | TBD         |

## Deployment Distribution

[DeploymentDistribution JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/DeploymentDistribution.json)

| Event Type                                            | Description |
|-------------------------------------------------------|-------------|
| io.zeebe.event.v1.DeploymentDistribution.distributing | TBD         |
| io.zeebe.event.v1.DeploymentDistribution.complete     | TBD         |
| io.zeebe.event.v1.DeploymentDistribution.completed    | TBD         |

## Error

[Error JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Error.json)

| Event Type                      | Description |
|---------------------------------|-------------|
| io.zeebe.event.v1.Error.created | TBD         |


## Escalation

[Escalation JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Escalation.json)

| Event Type                                | Description |
|-------------------------------------------|-------------|
| io.zeebe.event.v1.Escalation.escalated    | TBD         |
| io.zeebe.event.v1.Escalation.notEscalated | TBD         |


## Incident

[Incident JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Incident.json)

| Event Type                          | Description |
|-------------------------------------|-------------|
| io.zeebe.event.v1.Incident.created  | TBD         |
| io.zeebe.event.v1.Incident.resolve  | TBD         |
| io.zeebe.event.v1.Incident.resolved | TBD         |

## Job

[Job JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Job.json)

| Event Type                                 | Description |
|--------------------------------------------|-------------|
| io.zeebe.event.v1.Job.created              | TBD         |
| io.zeebe.event.v1.Job.complete             | TBD         |
| io.zeebe.event.v1.Job.completed            | TBD         |
| io.zeebe.event.v1.Job.timeOut              | TBD         |
| io.zeebe.event.v1.Job.timedOut             | TBD         |
| io.zeebe.event.v1.Job.fail                 | TBD         |
| io.zeebe.event.v1.Job.failed               | TBD         |
| io.zeebe.event.v1.Job.updateRetries        | TBD         |
| io.zeebe.event.v1.Job.retriesUpdated       | TBD         |
| io.zeebe.event.v1.Job.canceled             | TBD         |
| io.zeebe.event.v1.Job.throwError           | TBD         |
| io.zeebe.event.v1.Job.errorThrown          | TBD         |
| io.zeebe.event.v1.Job.recurAfterBackoff    | TBD         |
| io.zeebe.event.v1.Job.recurredAfterBackoff | TBD         |

## Job Batch

[JobBatch JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/JobBatch.json)

| Event Type                           | Description |
|--------------------------------------|-------------|
| io.zeebe.event.v1.JobBatch.activate  | TBD         |
| io.zeebe.event.v1.JobBatch.activated | TBD         |

## Message

[Message JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Message.json)

| Event Type                          | Description |
|-------------------------------------|-------------|
| io.zeebe.event.v1.Message.publish   | TBD         |
| io.zeebe.event.v1.Message.published | TBD         |
| io.zeebe.event.v1.Message.expire    | TBD         |
| io.zeebe.event.v1.Message.expired   | TBD         |

## Message Start Event Subscription

[MessageStartEventSubscription JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/MessageStartEventSubscription.json)

| Event Type                                                 | Description |
|------------------------------------------------------------|-------------|
| io.zeebe.event.v1.MessageStartEventSubscription.created    | TBD         |
| io.zeebe.event.v1.MessageStartEventSubscription.correlated | TBD         |
| io.zeebe.event.v1.MessageStartEventSubscription.deleted    | TBD         |

## Message Subscription

[MessageSubscription JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/MessageSubscription.json)

| Event Type                                        | Description |
|---------------------------------------------------|-------------|
| io.zeebe.event.v1.MessageSubscription.create      | TBD         |
| io.zeebe.event.v1.MessageSubscription.created     | TBD         |
| io.zeebe.event.v1.MessageSubscription.correlating | TBD         |
| io.zeebe.event.v1.MessageSubscription.correlate   | TBD         |
| io.zeebe.event.v1.MessageSubscription.correlated  | TBD         |
| io.zeebe.event.v1.MessageSubscription.reject      | TBD         |
| io.zeebe.event.v1.MessageSubscription.rejected    | TBD         |
| io.zeebe.event.v1.MessageSubscription.delete      | TBD         |
| io.zeebe.event.v1.MessageSubscription.deleted     | TBD         |

## Process

[Process JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Process.json)

| Event Type                        | Description |
|-----------------------------------|-------------|
| io.zeebe.event.v1.Process.created | TBD         |

## Process Event

[ProcessEvent JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessEvent.json)

| Event Type                                | Description |
|-------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessEvent.triggering | TBD         |
| io.zeebe.event.v1.ProcessEvent.triggered  | TBD         |


## Process Instance

[ProcessInstance JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstance.json)

| Event Type                                           | Description |
|------------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstance.cancel             | TBD         |
| io.zeebe.event.v1.ProcessInstance.sequenceFlowTaken  | TBD         |
| io.zeebe.event.v1.ProcessInstance.elementActivating  | TBD         |
| io.zeebe.event.v1.ProcessInstance.elementActivated   | TBD         |
| io.zeebe.event.v1.ProcessInstance.elementCompleting  | TBD         |
| io.zeebe.event.v1.ProcessInstance.elementCompleted   | TBD         |
| io.zeebe.event.v1.ProcessInstance.elementTerminating | TBD         |
| io.zeebe.event.v1.ProcessInstance.elementTerminated  | TBD         |
| io.zeebe.event.v1.ProcessInstance.activateElement    | TBD         |
| io.zeebe.event.v1.ProcessInstance.completeElement    | TBD         |
| io.zeebe.event.v1.ProcessInstance.terminateElement   | TBD         |

## Process Instance Creation

[ProcessInstanceCreation JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstanceCreation.json)

| Event Type                                                         | Description |
|--------------------------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstanceCreation.create                   | TBD         |
| io.zeebe.event.v1.ProcessInstanceCreation.created                  | TBD         |
| io.zeebe.event.v1.ProcessInstanceCreation.createWithAwaitingResult | TBD         |

## Process Instance Modification

[ProcessInstanceModification JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstanceModification.json)

| Event Type                                              | Description |
|---------------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstanceModification.modify    | TBD         |
| io.zeebe.event.v1.ProcessInstanceModification.modified  | TBD         |


## Process Instance Result

[ProcessInstanceResult JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstanceResult.json)

| Event Type                                        | Description |
|---------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstanceResult.completed | TBD         |


## Process Message Subscription

[ProcessMessageSubscription JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessMessageSubscription.json)

| Event Type                                              | Description |
|---------------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessMessageSubscription.creating   | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.create     | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.created    | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.correlate  | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.correlated | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.deleting   | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.delete     | TBD         |
| io.zeebe.event.v1.ProcessMessageSubscription.deleted    | TBD         |

## Timer

[Timer JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Timer.json)

| Event Type                        | Description |
|-----------------------------------|-------------|
| io.zeebe.event.v1.Timer.created   | TBD         |
| io.zeebe.event.v1.Timer.trigger   | TBD         |
| io.zeebe.event.v1.Timer.triggered | TBD         |
| io.zeebe.event.v1.Timer.canceled  | TBD         |

## Variable

[Variable JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Variable.json)

| Event Type                         | Description |
|------------------------------------|-------------|
| io.zeebe.event.v1.Variable.created | TBD         |
| io.zeebe.event.v1.Variable.updated | TBD         |

## Variable Document

[VariableDocument JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/VariableDocument.json)

| Event Type                                 | Description |
|--------------------------------------------|-------------|
| io.zeebe.event.v1.VariableDocument.update  | TBD         |
| io.zeebe.event.v1.VariableDocument.updated | TBD         |



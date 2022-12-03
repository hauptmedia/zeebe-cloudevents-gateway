Zeebe Cloudevents Gateway
=========================
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

Maps Zeebe Commands and Events to [Cloudevents.io](https://cloudevents.io) compatible HTTP Endpoints.

# Zeebe Cloudevents Commands

This Cloudevents gateway consumes the following Cloudevents via the integrated http listener.
Any Cloudevent with a request type produces the corresponding response Cloudevent on the originating channel (e.g. as HTTP response).
This is basically a thin translation layer for the Zeebe gRPC gateway protocol.

| Cloudevent Type                                             | Json Schema                                                                                                                         |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
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

This Cloudevents gateway produces the following events via the integrated http sender sink.

## Decision

[Decision JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Decision.json)

| Cloudevent Type                    |
|------------------------------------|
| io.zeebe.event.v1.Decision.created |

## Decision Evaluation

[DecisionEvaluation JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/DecisionEvaluation.json)

| Cloudevent Type                                |
|------------------------------------------------|
| io.zeebe.event.v1.DecisionEvaluation.evaluated |
| io.zeebe.event.v1.DecisionEvaluation.failed    |

## Decision Requirements

[DecisionRequirements JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/DecisionRequirements.json)

| Cloudevent Type                                |
|------------------------------------------------|
| io.zeebe.event.v1.DecisionRequirements.created |

## Deployment

[Deployment JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Deployment.json)

| Cloudevent Type                               |
|-----------------------------------------------|
| io.zeebe.event.v1.Deployment.create           |
| io.zeebe.event.v1.Deployment.created          |
| io.zeebe.event.v1.Deployment.distribute       |
| io.zeebe.event.v1.Deployment.distributed      |
| io.zeebe.event.v1.Deployment.fullyDistributed |

## Deployment Distribution

[DeploymentDistribution JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/DeploymentDistribution.json)

| Cloudevent Type                                       |
|-------------------------------------------------------|
| io.zeebe.event.v1.DeploymentDistribution.distributing |
| io.zeebe.event.v1.DeploymentDistribution.complete     |
| io.zeebe.event.v1.DeploymentDistribution.completed    |

## Error

[Error JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Error.json)

| Cloudevent Type                 |
|---------------------------------|
| io.zeebe.event.v1.Error.created |


## Escalation

[Escalation JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Escalation.json)

| Cloudevent Type                           |
|-------------------------------------------|
| io.zeebe.event.v1.Escalation.escalated    |
| io.zeebe.event.v1.Escalation.notEscalated |


## Incident

[Incident JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Incident.json)

| Cloudevent Type                     |
|-------------------------------------|
| io.zeebe.event.v1.Incident.created  |
| io.zeebe.event.v1.Incident.resolve  |
| io.zeebe.event.v1.Incident.resolved |

## Job

[Job JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Job.json)

| Cloudevent Type                            |
|--------------------------------------------|
| io.zeebe.event.v1.Job.created              |
| io.zeebe.event.v1.Job.complete             |
| io.zeebe.event.v1.Job.completed            |
| io.zeebe.event.v1.Job.timeOut              |
| io.zeebe.event.v1.Job.timedOut             |
| io.zeebe.event.v1.Job.fail                 |
| io.zeebe.event.v1.Job.failed               |
| io.zeebe.event.v1.Job.updateRetries        |
| io.zeebe.event.v1.Job.retriesUpdated       |
| io.zeebe.event.v1.Job.canceled             |
| io.zeebe.event.v1.Job.throwError           |
| io.zeebe.event.v1.Job.errorThrown          |
| io.zeebe.event.v1.Job.recurAfterBackoff    |
| io.zeebe.event.v1.Job.recurredAfterBackoff |

## Job Batch

[JobBatch JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/JobBatch.json)

| Cloudevent Type                      |
|--------------------------------------|
| io.zeebe.event.v1.JobBatch.activate  |
| io.zeebe.event.v1.JobBatch.activated |

## Message

[Message JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Message.json)

| Cloudevent Type                     |
|-------------------------------------|
| io.zeebe.event.v1.Message.publish   |
| io.zeebe.event.v1.Message.published |
| io.zeebe.event.v1.Message.expire    |
| io.zeebe.event.v1.Message.expired   |

## Message Start Event Subscription

[MessageStartEventSubscription JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/MessageStartEventSubscription.json)

| Cloudevent Type                                            |
|------------------------------------------------------------|
| io.zeebe.event.v1.MessageStartEventSubscription.created    |
| io.zeebe.event.v1.MessageStartEventSubscription.correlated |
| io.zeebe.event.v1.MessageStartEventSubscription.deleted    |

## Message Subscription

[MessageSubscription JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/MessageSubscription.json)

| Cloudevent Type                                   |
|---------------------------------------------------|
| io.zeebe.event.v1.MessageSubscription.create      |
| io.zeebe.event.v1.MessageSubscription.created     |
| io.zeebe.event.v1.MessageSubscription.correlating |
| io.zeebe.event.v1.MessageSubscription.correlate   |
| io.zeebe.event.v1.MessageSubscription.correlated  |
| io.zeebe.event.v1.MessageSubscription.reject      |
| io.zeebe.event.v1.MessageSubscription.rejected    |
| io.zeebe.event.v1.MessageSubscription.delete      |
| io.zeebe.event.v1.MessageSubscription.deleted     |

## Process

[Process JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Process.json)

| Cloudevent Type                   |
|-----------------------------------|
| io.zeebe.event.v1.Process.created |

## Process Event

[ProcessEvent JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessEvent.json)

| Cloudevent Type                           |
|-------------------------------------------|
| io.zeebe.event.v1.ProcessEvent.triggering |
| io.zeebe.event.v1.ProcessEvent.triggered  |


## Process Instance

[ProcessInstance JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstance.json)

| Cloudevent Type                                      |
|------------------------------------------------------|
| io.zeebe.event.v1.ProcessInstance.cancel             |
| io.zeebe.event.v1.ProcessInstance.sequenceFlowTaken  |
| io.zeebe.event.v1.ProcessInstance.elementActivating  |
| io.zeebe.event.v1.ProcessInstance.elementActivated   |
| io.zeebe.event.v1.ProcessInstance.elementCompleting  |
| io.zeebe.event.v1.ProcessInstance.elementCompleted   |
| io.zeebe.event.v1.ProcessInstance.elementTerminating |
| io.zeebe.event.v1.ProcessInstance.elementTerminated  |
| io.zeebe.event.v1.ProcessInstance.activateElement    |
| io.zeebe.event.v1.ProcessInstance.completeElement    |
| io.zeebe.event.v1.ProcessInstance.terminateElement   |

## Process Instance Creation

[ProcessInstanceCreation JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstanceCreation.json)

| Cloudevent Type                                                    |
|--------------------------------------------------------------------|
| io.zeebe.event.v1.ProcessInstanceCreation.create                   |
| io.zeebe.event.v1.ProcessInstanceCreation.created                  |
| io.zeebe.event.v1.ProcessInstanceCreation.createWithAwaitingResult |

## Process Instance Modification

[ProcessInstanceModification JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstanceModification.json)

| Cloudevent Type                                         |
|---------------------------------------------------------|
| io.zeebe.event.v1.ProcessInstanceModification.modify    |
| io.zeebe.event.v1.ProcessInstanceModification.modified  |


## Process Instance Result

[ProcessInstanceResult JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessInstanceResult.json)

| Cloudevent Type                                   |
|---------------------------------------------------|
| io.zeebe.event.v1.ProcessInstanceResult.completed |


## Process Message Subscription

[ProcessMessageSubscription JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/ProcessMessageSubscription.json)

| Cloudevent Type                                         |
|---------------------------------------------------------|
| io.zeebe.event.v1.ProcessMessageSubscription.creating   |
| io.zeebe.event.v1.ProcessMessageSubscription.create     |
| io.zeebe.event.v1.ProcessMessageSubscription.created    |
| io.zeebe.event.v1.ProcessMessageSubscription.correlate  |
| io.zeebe.event.v1.ProcessMessageSubscription.correlated |
| io.zeebe.event.v1.ProcessMessageSubscription.deleting   |
| io.zeebe.event.v1.ProcessMessageSubscription.delete     |
| io.zeebe.event.v1.ProcessMessageSubscription.deleted    |

## Timer

[Timer JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Timer.json)

| Cloudevent Type                   |
|-----------------------------------|
| io.zeebe.event.v1.Timer.created   |
| io.zeebe.event.v1.Timer.trigger   |
| io.zeebe.event.v1.Timer.triggered |
| io.zeebe.event.v1.Timer.canceled  |

## Variable

[Variable JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/Variable.json)

| Cloudevent Type                    |
|------------------------------------|
| io.zeebe.event.v1.Variable.created |
| io.zeebe.event.v1.Variable.updated |

## Variable Document

[VariableDocument JSON Schema](https://hauptmedia.github.io/zeebe-exporter-types/jsonschema/VariableDocument.json)

| Cloudevent Type                            |
|--------------------------------------------|
| io.zeebe.event.v1.VariableDocument.update  |
| io.zeebe.event.v1.VariableDocument.updated |



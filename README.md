Zeebe Cloudevents Gateway
=========================
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

Maps Zeebe Event Protocol Records to [Cloudevents.io](https://cloudevents.io) compatible HTTP Endpoints.

# Available Cloudevents types

## Decision

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.decision.json)

| Event Type                         | Description |
|------------------------------------|-------------|
| io.zeebe.event.v1.Decision.created | TBD         |

## Decision Evaluation

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.decision_evaluation.json)

| Event Type                                     | Description |
|------------------------------------------------|-------------|
| io.zeebe.event.v1.DecisionEvaluation.evaluated | TBD         |
| io.zeebe.event.v1.DecisionEvaluation.failed    | TBD         |

## Decision Requirements

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.decision_requirements.json)

| Event Type                                     | Description |
|------------------------------------------------|-------------|
| io.zeebe.event.v1.DecisionRequirements.created | TBD         |

## Deployment

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.deployment.json)

| Event Type                                    | Description |
|-----------------------------------------------|-------------|
| io.zeebe.event.v1.Deployment.create           | TBD         |
| io.zeebe.event.v1.Deployment.created          | TBD         |
| io.zeebe.event.v1.Deployment.distribute       | TBD         |
| io.zeebe.event.v1.Deployment.distributed      | TBD         |
| io.zeebe.event.v1.Deployment.fullyDistributed | TBD         |

## Deployment Distribution

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.deployment_distribution.json)

| Event Type                                            | Description |
|-------------------------------------------------------|-------------|
| io.zeebe.event.v1.DeploymentDistribution.distributing | TBD         |
| io.zeebe.event.v1.DeploymentDistribution.complete     | TBD         |
| io.zeebe.event.v1.DeploymentDistribution.completed    | TBD         |

## Error

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.error.json)

| Event Type                      | Description |
|---------------------------------|-------------|
| io.zeebe.event.v1.Error.created | TBD         |


## Escalation

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.escalation.json)

| Event Type                                | Description |
|-------------------------------------------|-------------|
| io.zeebe.event.v1.Escalation.escalated    | TBD         |
| io.zeebe.event.v1.Escalation.notEscalated | TBD         |


## Incident

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.incident.json)

| Event Type                          | Description |
|-------------------------------------|-------------|
| io.zeebe.event.v1.Incident.created  | TBD         |
| io.zeebe.event.v1.Incident.resolve  | TBD         |
| io.zeebe.event.v1.Incident.resolved | TBD         |

## Job

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.job.json)

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

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.job_batch.json)

| Event Type                           | Description |
|--------------------------------------|-------------|
| io.zeebe.event.v1.JobBatch.activate  | TBD         |
| io.zeebe.event.v1.JobBatch.activated | TBD         |

## Message

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.message.json)

| Event Type                          | Description |
|-------------------------------------|-------------|
| io.zeebe.event.v1.Message.publish   | TBD         |
| io.zeebe.event.v1.Message.published | TBD         |
| io.zeebe.event.v1.Message.expire    | TBD         |
| io.zeebe.event.v1.Message.expired   | TBD         |

## Message Start Event Subscription

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.message_start_event_subscription.json)

| Event Type                                                 | Description |
|------------------------------------------------------------|-------------|
| io.zeebe.event.v1.MessageStartEventSubscription.created    | TBD         |
| io.zeebe.event.v1.MessageStartEventSubscription.correlated | TBD         |
| io.zeebe.event.v1.MessageStartEventSubscription.deleted    | TBD         |

## Message Subscription

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.message_subscription.json)

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

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process.json)

| Event Type                        | Description |
|-----------------------------------|-------------|
| io.zeebe.event.v1.Process.created | TBD         |

## Process Event

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process_event.json)

| Event Type                                | Description |
|-------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessEvent.triggering | TBD         |
| io.zeebe.event.v1.ProcessEvent.triggered  | TBD         |


## Process Instance

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process_instance.json)

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

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process_instance_creation.json)

| Event Type                                                         | Description |
|--------------------------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstanceCreation.create                   | TBD         |
| io.zeebe.event.v1.ProcessInstanceCreation.created                  | TBD         |
| io.zeebe.event.v1.ProcessInstanceCreation.createWithAwaitingResult | TBD         |

## Process Instance Modification

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process_instance_modification.json)

| Event Type                                              | Description |
|---------------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstanceModification.modify    | TBD         |
| io.zeebe.event.v1.ProcessInstanceModification.modified  | TBD         |


## Process Instance Result

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process_instance_result.json)

| Event Type                                        | Description |
|---------------------------------------------------|-------------|
| io.zeebe.event.v1.ProcessInstanceResult.completed | TBD         |


## Process Message Subscription

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.process_message_subscription.json)

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

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.timer.json)

| Event Type                        | Description |
|-----------------------------------|-------------|
| io.zeebe.event.v1.Timer.created   | TBD         |
| io.zeebe.event.v1.Timer.trigger   | TBD         |
| io.zeebe.event.v1.Timer.triggered | TBD         |
| io.zeebe.event.v1.Timer.canceled  | TBD         |

## Variable

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.variable.json)

| Event Type                         | Description |
|------------------------------------|-------------|
| io.zeebe.event.v1.Variable.created | TBD         |
| io.zeebe.event.v1.Variable.updated | TBD         |

## Variable Document

[JSON Schema](https://github.com/hauptmedia/zeebe-exporter-types/tree/main/jsonschema/io.zeebe.event.variable_document.json)

| Event Type                                 | Description |
|--------------------------------------------|-------------|
| io.zeebe.event.v1.VariableDocument.update  | TBD         |
| io.zeebe.event.v1.VariableDocument.updated | TBD         |



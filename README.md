Zeebe Cloudevents Gateway
=========================
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

Maps Zeebe Event Protocol Records to [Cloudevents.io](https://cloudevents.io) compatible HTTP Endpoints.

# Available Cloudevents types

## Decision

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/decision.json)

| Event Type                                    | Description |
|-----------------------------------------------|-------------|
| io.zeebe.event.decision.created               | TBD         |

## Decision Evaluation

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/decision_evaluation.json)

| Event Type                                   | Description |
|----------------------------------------------|-------------|
| io.zeebe.event.decision_evaluation.evaluated | TBD         |
| io.zeebe.event.decision_evaluation.failed    | TBD         |

## Decision Requirements

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/decision_requirements.json)

| Event Type                                   | Description |
|----------------------------------------------|-------------|
| io.zeebe.event.decision_requirements.created | TBD         |

## Deployment

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/deployment.json)

| Event Type                                  | Description |
|---------------------------------------------|-------------|
| io.zeebe.event.deployment.create            | TBD         |
| io.zeebe.event.deployment.created           | TBD         |
| io.zeebe.event.deployment.distribute        | TBD         |
| io.zeebe.event.deployment.distributed       | TBD         |
| io.zeebe.event.deployment.fully_distributed | TBD         |

## Deployment Distribution

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/deployment_distribution.json)

| Event Type                                          | Description |
|-----------------------------------------------------|-------------|
| io.zeebe.event.deployment_distribution.distributing | TBD         |
| io.zeebe.event.deployment_distribution.complete     | TBD         |
| io.zeebe.event.deployment_distribution.completed    | TBD         |

## Error

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/error.json)

| Event Type                                       | Description |
|--------------------------------------------------|-------------|
| io.zeebe.event.error.created                     | TBD         |


## Escalation

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/escalation.json)

| Event Type                               | Description |
|------------------------------------------|-------------|
| io.zeebe.event.escalation.escalated      | TBD         |
| io.zeebe.event.escalation.not_escalated  | TBD         |


## Incident

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/incident.json)

| Event Type                        | Description |
|-----------------------------------|-------------|
| io.zeebe.event.incident.created   | TBD         |
| io.zeebe.event.incident.resolve   | TBD         |
| io.zeebe.event.incident.resolved  | TBD         |

## Job

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/job.json)

| Event Type                                 | Description |
|--------------------------------------------|-------------|
| io.zeebe.event.job.created                 | TBD         |
| io.zeebe.event.job.complete                | TBD         |
| io.zeebe.event.job.completed               | TBD         |
| io.zeebe.event.job.time_out                | TBD         |
| io.zeebe.event.job.timed_out               | TBD         |
| io.zeebe.event.job.fail                    | TBD         |
| io.zeebe.event.job.failed                  | TBD         |
| io.zeebe.event.job.update_retries          | TBD         |
| io.zeebe.event.job.retries_updated         | TBD         |
| io.zeebe.event.job.canceled                | TBD         |
| io.zeebe.event.job.throw_error             | TBD         |
| io.zeebe.event.job.error_thrown            | TBD         |
| io.zeebe.event.job.recur_after_backoff     | TBD         |
| io.zeebe.event.job.recurred_after_backoff  | TBD         |

## Job Batch

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/job_batch.json)

| Event Type                                 | Description |
|--------------------------------------------|-------------|
| io.zeebe.event.job_batch.activate          | TBD         |
| io.zeebe.event.job_batch.activated         | TBD         |

## Message

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/message.json)

| Event Type                       | Description |
|----------------------------------|-------------|
| io.zeebe.event.message.publish   | TBD         |
| io.zeebe.event.message.published | TBD         |
| io.zeebe.event.message.expire    | TBD         |
| io.zeebe.event.message.expired   | TBD         |

## Message Start Event Subscription

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/message_start_event_subscription.json)

| Event Type                                                 | Description |
|------------------------------------------------------------|-------------|
| io.zeebe.event.message_start_event_subscription.created    | TBD         |
| io.zeebe.event.message_start_event_subscription.correlated | TBD         |
| io.zeebe.event.message_start_event_subscription.deleted    | TBD         |

## Message Subscription

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/message_subscription.json)

| Event Type                                      | Description |
|-------------------------------------------------|-------------|
| io.zeebe.event.message_subscription.create      | TBD         |
| io.zeebe.event.message_subscription.created     | TBD         |
| io.zeebe.event.message_subscription.correlating | TBD         |
| io.zeebe.event.message_subscription.correlate   | TBD         |
| io.zeebe.event.message_subscription.correlated  | TBD         |
| io.zeebe.event.message_subscription.reject      | TBD         |
| io.zeebe.event.message_subscription.rejected    | TBD         |
| io.zeebe.event.message_subscription.delete      | TBD         |
| io.zeebe.event.message_subscription.deleted     | TBD         |

## Process

| Event Type                      | Description |
|---------------------------------|-------------|
| io.zeebe.event.process.created  | TBD         |

## Process Event

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/process_event.json)

| Event Type                              | Description |
|-----------------------------------------|-------------|
| io.zeebe.event.process_event.triggering | TBD         |
| io.zeebe.event.process_event.triggered  | TBD         |


## Process Instance

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/process_instance.json)

| Event Type                                           | Description |
|------------------------------------------------------|-------------|
| io.zeebe.event.process_instance.cancel               | TBD         |
| io.zeebe.event.process_instance.sequence_flow_taken  | TBD         |
| io.zeebe.event.process_instance.element_activating   | TBD         |
| io.zeebe.event.process_instance.element_activated    | TBD         |
| io.zeebe.event.process_instance.element_completing   | TBD         |
| io.zeebe.event.process_instance.element_completed    | TBD         |
| io.zeebe.event.process_instance.element_terminating  | TBD         |
| io.zeebe.event.process_instance.element_terminated   | TBD         |
| io.zeebe.event.process_instance.activate_element     | TBD         |
| io.zeebe.event.process_instance.complete_element     | TBD         |
| io.zeebe.event.process_instance.terminate_element    | TBD         |

## Process Instance Creation

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/process_instance_creation.json)

| Event Type                                                            | Description |
|-----------------------------------------------------------------------|-------------|
| io.zeebe.event.process_instance_creation.create                       | TBD         |
| io.zeebe.event.process_instance_creation.created                      | TBD         |
| io.zeebe.event.process_instance_creation.create_with_awaiting_result  | TBD         |

## Process Instance Modification

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/process_instance_modification.json)

| Event Type                                                         | Description |
|--------------------------------------------------------------------|-------------|
| io.zeebe.event.process_instance_modification.modify                | TBD         |
| io.zeebe.event.process_instance_modification.modified              | TBD         |


## Process Instance Result

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/process_instance_result.json)

| Event Type                                            | Description |
|-------------------------------------------------------|-------------|
| io.zeebe.event.process_instance_result.completed      | TBD         |


## Process Message Subscription

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/process_message_subscription.json)

| Event Type                                              | Description |
|---------------------------------------------------------|-------------|
| io.zeebe.event.process_message_subscription.creating    | TBD         |
| io.zeebe.event.process_message_subscription.create      | TBD         |
| io.zeebe.event.process_message_subscription.created     | TBD         |
| io.zeebe.event.process_message_subscription.correlate   | TBD         |
| io.zeebe.event.process_message_subscription.correlated  | TBD         |
| io.zeebe.event.process_message_subscription.deleting    | TBD         |
| io.zeebe.event.process_message_subscription.delete      | TBD         |
| io.zeebe.event.process_message_subscription.deleted     | TBD         |

## Timer

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/timer.json)

| Event Type                        | Description |
|-----------------------------------|-------------|
| io.zeebe.event.timer.created      | TBD         |
| io.zeebe.event.timer.trigger      | TBD         |
| io.zeebe.event.timer.triggered    | TBD         |
| io.zeebe.event.timer.canceled     | TBD         |

## Variable

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/variable.json)

| Event Type                       | Description |
|----------------------------------|-------------|
| io.zeebe.event.variable.created  | TBD         |
| io.zeebe.event.variable.updated  | TBD         |

## Variable Document

[JSON Schema](https://github.com/hauptmedia/zeebe-cloudevents-gateway/blob/main/jsonschema/event/variable_document.json)

| Event Type                                | Description |
|-------------------------------------------|-------------|
| io.zeebe.event.variable_document.update   | TBD         |
| io.zeebe.event.variable_document.updated  | TBD         |



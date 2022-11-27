Zeebe Cloudevents Gateway
=========================
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

Maps Zeebe Event Protocol Records to [Cloudevents.io](https://cloudevents.io) comaptible HTTP Endpoints.

# Available Cloudevents types

## Decision

- io.zeebe.event.decision.created

## Decision Evaluation

- io.zeebe.event.decision_evaluation.evaluated
- io.zeebe.event.decision_evaluation.failed

## Decision Requirements

- io.zeebe.event.decision_requirements.created

## Deployment

- io.zeebe.event.deployment.create
- io.zeebe.event.deployment.created
- io.zeebe.event.deployment.distribute
- io.zeebe.event.deployment.distributed
- io.zeebe.event.deployment.fully_distributed

## Deployment Distribution

- io.zeebe.event.deployment_distribution.distributing
- io.zeebe.event.deployment_distribution.complete
- io.zeebe.event.deployment_distribution.completed

## Error

- io.zeebe.event.error.created

## Escalation

- io.zeebe.event.escalation.escalated
- io.zeebe.event.escalation.not_escalated

## Incident

- io.zeebe.event.incident.created
- io.zeebe.event.incident.resolve
- io.zeebe.event.incident.resolved

## Job

- io.zeebe.event.job.created
- io.zeebe.event.job.complete
- io.zeebe.event.job.completed
- io.zeebe.event.job.time_out
- io.zeebe.event.job.timed_out
- io.zeebe.event.job.fail
- io.zeebe.event.job.failed
- io.zeebe.event.job.update_retries
- io.zeebe.event.job.retries_updated
- io.zeebe.event.job.canceled
- io.zeebe.event.job.throw_error
- io.zeebe.event.job.error_thrown
- io.zeebe.event.job.recur_after_backoff
- io.zeebe.event.job.recurred_after_backoff

## Job Batch

- io.zeebe.event.job_batch.activate
- io.zeebe.event.job_batch.activated

## Message

- io.zeebe.event.message.publish
- io.zeebe.event.message.published
- io.zeebe.event.message.expire
- io.zeebe.event.message.expired

## Message Start Event Subscription

- io.zeebe.event.message_start_event_subscription.created
- io.zeebe.event.message_start_event_subscription.correlated
- io.zeebe.event.message_start_event_subscription.deleted

## Message Subscription

- io.zeebe.event.message_subscription.create
- io.zeebe.event.message_subscription.created
- io.zeebe.event.message_subscription.correlating
- io.zeebe.event.message_subscription.correlate
- io.zeebe.event.message_subscription.correlated
- io.zeebe.event.message_subscription.reject
- io.zeebe.event.message_subscription.rejected
- io.zeebe.event.message_subscription.delete
- io.zeebe.event.message_subscription.deleted

## Process

- io.zeebe.event.process.created

## Process Event

- io.zeebe.event.process_event.triggering
- io.zeebe.event.process_event.triggered

## Process Instance

- io.zeebe.event.process_instance.cancel
- io.zeebe.event.process_instance.sequence_flow_taken
- io.zeebe.event.process_instance.element_activating
- io.zeebe.event.process_instance.element_activated
- io.zeebe.event.process_instance.element_completing
- io.zeebe.event.process_instance.element_completed
- io.zeebe.event.process_instance.element_terminating
- io.zeebe.event.process_instance.element_terminated
- io.zeebe.event.process_instance.activate_element
- io.zeebe.event.process_instance.complete_element
- io.zeebe.event.process_instance.terminate_element

## Process Instance Creation

- io.zeebe.event.process_instance_creation.create
- io.zeebe.event.process_instance_creation.created
- io.zeebe.event.process_instance_creation.create_with_awaiting_result

## Process Instance Modification

- io.zeebe.event.process_instance_modification.modify
- io.zeebe.event.process_instance_modification.modified

## Process Instance Result

- io.zeebe.event.process_instance_result.completed

## Process Message Subscription

- io.zeebe.event.process_message_subscription.creating
- io.zeebe.event.process_message_subscription.create
- io.zeebe.event.process_message_subscription.created
- io.zeebe.event.process_message_subscription.correlate
- io.zeebe.event.process_message_subscription.correlated
- io.zeebe.event.process_message_subscription.deleting
- io.zeebe.event.process_message_subscription.delete
- io.zeebe.event.process_message_subscription.deleted

## Timer

- io.zeebe.event.timer.created
- io.zeebe.event.timer.trigger
- io.zeebe.event.timer.triggered
- io.zeebe.event.timer.canceled

## Variable

- io.zeebe.event.variable.created
- io.zeebe.event.variable.updated

## Variable Document

- io.zeebe.event.variable_document.update
- io.zeebe.event.variable_document.updated


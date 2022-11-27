Zeebe Cloudevents Gateway
=========================
![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

Maps Zeebe Event Protocol Records to [Cloudevents.io](https://cloudevents.io) comaptible HTTP Endpoints.

# Available Cloudevents types

## Decision

- io.zeebe.protocol.record.event.decision.created

## Decision Evaluation

- io.zeebe.protocol.record.event.decision_evaluation.evaluated
- io.zeebe.protocol.record.event.decision_evaluation.failed

## Decision Requirements

- io.zeebe.protocol.record.event.decision_requirements.created

## Deployment

- io.zeebe.protocol.record.event.deployment.create
- io.zeebe.protocol.record.event.deployment.created
- io.zeebe.protocol.record.event.deployment.distribute
- io.zeebe.protocol.record.event.deployment.distributed
- io.zeebe.protocol.record.event.deployment.fully_distributed

## Deployment Distribution

- io.zeebe.protocol.record.event.deployment_distribution.distributing
- io.zeebe.protocol.record.event.deployment_distribution.complete
- io.zeebe.protocol.record.event.deployment_distribution.completed

## Error

- io.zeebe.protocol.record.event.error.created

## Escalation

- io.zeebe.protocol.record.event.escalation.escalated
- io.zeebe.protocol.record.event.escalation.not_escalated

## Incident

- io.zeebe.protocol.record.event.incident.created
- io.zeebe.protocol.record.event.incident.resolve
- io.zeebe.protocol.record.event.incident.resolved

## Job

- io.zeebe.protocol.record.event.job.created
- io.zeebe.protocol.record.event.job.complete
- io.zeebe.protocol.record.event.job.completed
- io.zeebe.protocol.record.event.job.time_out
- io.zeebe.protocol.record.event.job.timed_out
- io.zeebe.protocol.record.event.job.fail
- io.zeebe.protocol.record.event.job.failed
- io.zeebe.protocol.record.event.job.update_retries
- io.zeebe.protocol.record.event.job.retries_updated
- io.zeebe.protocol.record.event.job.canceled
- io.zeebe.protocol.record.event.job.throw_error
- io.zeebe.protocol.record.event.job.error_thrown
- io.zeebe.protocol.record.event.job.recur_after_backoff
- io.zeebe.protocol.record.event.job.recurred_after_backoff

## Job Batch

- io.zeebe.protocol.record.event.job_batch.activate
- io.zeebe.protocol.record.event.job_batch.activated

## Message

- io.zeebe.protocol.record.event.message.publish
- io.zeebe.protocol.record.event.message.published
- io.zeebe.protocol.record.event.message.expire
- io.zeebe.protocol.record.event.message.expired

## Message Start Event Subscription

- io.zeebe.protocol.record.event.message_start_event_subscription.created
- io.zeebe.protocol.record.event.message_start_event_subscription.correlated
- io.zeebe.protocol.record.event.message_start_event_subscription.deleted

## Message Subscription

- io.zeebe.protocol.record.event.message_subscription.create
- io.zeebe.protocol.record.event.message_subscription.created
- io.zeebe.protocol.record.event.message_subscription.correlating
- io.zeebe.protocol.record.event.message_subscription.correlate
- io.zeebe.protocol.record.event.message_subscription.correlated
- io.zeebe.protocol.record.event.message_subscription.reject
- io.zeebe.protocol.record.event.message_subscription.rejected
- io.zeebe.protocol.record.event.message_subscription.delete
- io.zeebe.protocol.record.event.message_subscription.deleted

## Process

- io.zeebe.protocol.record.event.process.created

## Process Event

- io.zeebe.protocol.record.event.process_event.triggering
- io.zeebe.protocol.record.event.process_event.triggered

## Process Instance

- io.zeebe.protocol.record.event.process_instance.cancel
- io.zeebe.protocol.record.event.process_instance.sequence_flow_taken
- io.zeebe.protocol.record.event.process_instance.element_activating
- io.zeebe.protocol.record.event.process_instance.element_activated
- io.zeebe.protocol.record.event.process_instance.element_completing
- io.zeebe.protocol.record.event.process_instance.element_completed
- io.zeebe.protocol.record.event.process_instance.element_terminating
- io.zeebe.protocol.record.event.process_instance.element_terminated
- io.zeebe.protocol.record.event.process_instance.activate_element
- io.zeebe.protocol.record.event.process_instance.complete_element
- io.zeebe.protocol.record.event.process_instance.terminate_element

## Process Instance Creation

- io.zeebe.protocol.record.event.process_instance_creation.create
- io.zeebe.protocol.record.event.process_instance_creation.created
- io.zeebe.protocol.record.event.process_instance_creation.create_with_awaiting_result

## Process Instance Modification

- io.zeebe.protocol.record.event.process_instance_modification.modify
- io.zeebe.protocol.record.event.process_instance_modification.modified

## Process Instance Result

- io.zeebe.protocol.record.event.process_instance_result.completed

## Process Message Subscription

- io.zeebe.protocol.record.event.process_message_subscription.creating
- io.zeebe.protocol.record.event.process_message_subscription.create
- io.zeebe.protocol.record.event.process_message_subscription.created
- io.zeebe.protocol.record.event.process_message_subscription.correlate
- io.zeebe.protocol.record.event.process_message_subscription.correlated
- io.zeebe.protocol.record.event.process_message_subscription.deleting
- io.zeebe.protocol.record.event.process_message_subscription.delete
- io.zeebe.protocol.record.event.process_message_subscription.deleted

## Timer

- io.zeebe.protocol.record.event.timer.created
- io.zeebe.protocol.record.event.timer.trigger
- io.zeebe.protocol.record.event.timer.triggered
- io.zeebe.protocol.record.event.timer.canceled

## Variable

- io.zeebe.protocol.record.event.variable.created
- io.zeebe.protocol.record.event.variable.updated

## Variable Document

- io.zeebe.protocol.record.event.variable_document.update
- io.zeebe.protocol.record.event.variable_document.updated


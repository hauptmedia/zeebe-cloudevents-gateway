import dotenv from "dotenv";
import {HttpListener} from "./cloudevents/HttpListener";
import {HttpSender, HttpSenderOptions} from "./cloudevents/HttpSender";
import config from 'config';
import {KafkaConsumer} from "./consumer/KafkaConsumer";
import {ZeebeClient} from "./zeebe/ZeebeClient";
import {CloudeventsHandler} from "./cloudevents/CloudeventsHandler";
import {HazelcastConsumer} from "./consumer/HazelcastConsumer";

dotenv.config();

export class Application {
    run() {
        const zeebeClient = new ZeebeClient(config.get('zeebe.client')),
            cloudEventsHandler = new CloudeventsHandler(zeebeClient);

        const cloudeventsConsumer = new HttpListener(cloudEventsHandler, config.get('cloudevents.httpListener'));
        cloudeventsConsumer.start();

        const
            httpSenderConfiguration = config.get('cloudevents.httpSender') as HttpSenderOptions,
            source = httpSenderConfiguration.source == 'kafka' ?
                new KafkaConsumer(config.get('consumer.kafka')) :
                new HazelcastConsumer(config.get('consumer.hazelcast'));
console.log(httpSenderConfiguration);
        const cloudeventsProducer = new HttpSender(source, httpSenderConfiguration);
        cloudeventsProducer.start();
    }
}
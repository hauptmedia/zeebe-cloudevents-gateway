import dotenv from "dotenv";
import {HttpListener} from "./cloudevents/HttpListener";
import {HttpSender, HttpSenderOptions} from "./cloudevents/HttpSender";
import {KafkaConsumer} from "./consumer/KafkaConsumer";
import {ZeebeClient} from "./zeebe/ZeebeClient";
import {CloudeventsHandler} from "./cloudevents/CloudeventsHandler";
import {HazelcastConsumer} from "./consumer/HazelcastConsumer";

dotenv.config();
import config from 'config';

export class Application {
    run() {
        const zeebeClient = new ZeebeClient(config.get('zeebe.client')),
            cloudEventsHandler = new CloudeventsHandler(zeebeClient);

        const cloudeventsConsumer = new HttpListener(cloudEventsHandler, config.get('cloudevents.httpListener'));
        cloudeventsConsumer.start();

        const
            httpSenderConfiguration = config.get('cloudevents.httpSender') as HttpSenderOptions,
            source = httpSenderConfiguration.source == 'kafka' ?
                new KafkaConsumer(config.get('kafka')) :
                new HazelcastConsumer(config.get('hazelcast'));

        const cloudeventsProducer = new HttpSender(source, httpSenderConfiguration);
        cloudeventsProducer.start();
    }
}
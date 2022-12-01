import dotenv from "dotenv";
import {HttpListener} from "./cloudevents/HttpListener";
import {HttpSender} from "./cloudevents/HttpSender";
import config from 'config';
import {KafkaConsumer} from "./consumer/KafkaConsumer";
import {ZeebeClient} from "./zeebe/ZeebeClient";
import {CloudeventsHandler} from "./cloudevents/CloudeventsHandler";

dotenv.config();

export class Application {
    run() {
        const zeebeClient = new ZeebeClient(config.get('zeebe.client')),
            cloudEventsHandler = new CloudeventsHandler(zeebeClient);

        const cloudeventsConsumer = new HttpListener(cloudEventsHandler, config.get('cloudevents.httpListener'));
        cloudeventsConsumer.start();

        const kafkaConsumer = new KafkaConsumer(config.get('consumer.kafka')),
              cloudeventsProducer = new HttpSender(kafkaConsumer, config.get('cloudevents.httpSender'));
        cloudeventsProducer.start();
    }
}
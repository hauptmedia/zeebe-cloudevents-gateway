import dotenv from "dotenv";
import {HttpListener} from "./cloudevents/HttpListener";
import {HttpSender} from "./cloudevents/HttpSender";
import config from 'config';
import {KafkaConsumer} from "./consumer/KafkaConsumer";
import {Client} from "./zeebe/Client";
import {CloudeventsHandler} from "./cloudevents/CloudeventsHandler";

dotenv.config();

export class Application {
    run() {
        const zeebeClient = new Client(config.get('zeebe.client')),
            cloudEventsHandler = new CloudeventsHandler(zeebeClient);

        const cloudeventsConsumer = new HttpListener(cloudEventsHandler, config.get('cloudevents.httpListener'));
        cloudeventsConsumer.start();

        const kafkaConsumer = new KafkaConsumer(config.get('consumer.kafka')),
              cloudeventsProducer = new HttpSender(kafkaConsumer, config.get('cloudevents.httpSender'));
        cloudeventsProducer.start();
    }
}
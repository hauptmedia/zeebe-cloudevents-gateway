import dotenv from "dotenv";
import {HttpListener} from "./cloudevents/consumer/HttpListener";
import {HttpSender} from "./cloudevents/producer/HttpSender";
import config from 'config';
import {KafkaConsumer} from "./cloudevents/producer/KafkaConsumer";

dotenv.config();

export class Application {
    run() {
        const cloudeventsConsumer = new HttpListener(config.get('cloudevents.consumer.httpListener'));
        cloudeventsConsumer.start();

        const kafkaConsumer = new KafkaConsumer(config.get('cloudevents.producer.kafkaConsumer')),
              cloudeventsProducer = new HttpSender(kafkaConsumer, config.get('cloudevents.producer.httpSender'));
        cloudeventsProducer.start();
    }
}
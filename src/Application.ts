import dotenv from "dotenv";
import {HttpServer} from "./cloudevents/consumer/HttpServer";
import {HttpSender} from "./cloudevents/producer/HttpSender";
import config from 'config';
import {KafkaConsumer} from "./cloudevents/producer/KafkaConsumer";

dotenv.config();

export class Application {
    run() {
        const ceConsumer = new HttpServer();
        ceConsumer.start();

        const kafkaConsumer = new KafkaConsumer(config.get('cloudevents.producer.kafkaConsumer')),
              cloudeventsSender = new HttpSender(kafkaConsumer, config.get('cloudevents.producer.httpSender'));
        cloudeventsSender.start();
    }
}
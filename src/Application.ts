import dotenv from "dotenv";
import {HttpServer} from "./cloudevents/consumer/HttpServer";
import {HttpSender} from "./cloudevents/producer/HttpSender";
import config from 'config';

dotenv.config();

export class Application {
    run() {
        const ceConsumer = new HttpServer();
        ceConsumer.start();

        const ceProducer = new HttpSender(config.get('cloudevents.producer'));
        ceProducer.start();
    }
}
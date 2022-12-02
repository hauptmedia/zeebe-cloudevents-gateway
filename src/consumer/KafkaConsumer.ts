import {Consumer, Kafka} from "kafkajs";
import {ConsumerInterface} from "./ConsumerInterface";

export interface KafkaConsumerOptions {
    clientId: string;
    groupId: string;
    brokers: string[];
    topics: string[];
}


export class KafkaConsumer implements ConsumerInterface {
    protected kafka: Kafka;
    protected consumer: Consumer;
    protected options: KafkaConsumerOptions;

    constructor(options: KafkaConsumerOptions) {
        console.log(`[KafkaConsumer] Registering to topics ${options.topics.join(",")}`)

        this.options = options;

        this.kafka = new Kafka({
            clientId: options.clientId,
            brokers: options.brokers
        })

        this.consumer = this.kafka.consumer({groupId: options.groupId})
    }

    async start(cb: (data: string, pause: () => () => void) => void) {
        await this.consumer.connect()
        await this.consumer.subscribe({topics: this.options.topics})

        await this.consumer.run({
            eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
                if (!message.value)
                    return;

                cb(message.value.toString(), pause);

                console.log(`[kafka] processed ${topic}/${partition}/${message.offset}`);

            }
        });
    }
}
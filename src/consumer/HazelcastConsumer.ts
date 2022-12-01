import {Client} from "hazelcast-client";
import {Ringbuffer} from "hazelcast-client/lib/proxy";
import {HazelcastClient} from "hazelcast-client/lib/HazelcastClient";
import {ConsumerInterface} from "./ConsumerInterface";

type HazelcastOptions = {
    fromBeginning: boolean
    ringbufferName: string
    clusterName: string
    clusterMembers: string[]
}

export class HazelcastConsumer implements ConsumerInterface{
    protected client: HazelcastClient | null = null;

    protected ringbuffer: Ringbuffer<string> | null = null;

    protected options: HazelcastOptions;

    constructor(options: HazelcastOptions) {
        this.options = options;
    }

    async connect() {
        this.client = await Client.newHazelcastClient({
            clusterName: this.options.clusterName,
            network: {
                clusterMembers: this.options.clusterMembers
            }
        });
        this.ringbuffer = await this.client.getRingbuffer<string>(this.options.ringbufferName);
    }

    async start(cb: (data: string, pause: () => () => void) => void) {
        if(this.ringbuffer === null)
            throw "Not connected";

        //TODO: implement pause / resume function
        const pause = () => {
            return () => {}
        }

        let sequence = await this.ringbuffer.tailSequence();
        sequence = sequence.add(1);

        while(true){
            // readOne blocks if no item is available
            const value = await this.ringbuffer.readOne(sequence);
            if(value)
                cb(value.toString(), pause);

            sequence = sequence.add(1);
        }
    }

    async disconnect() {
        this.ringbuffer = null;
        await this.client?.shutdown();
        this.client = null;
    }
}

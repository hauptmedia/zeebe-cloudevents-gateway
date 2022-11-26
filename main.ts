import dotenv from "dotenv";
import {Kafka} from 'kafkajs';
import Http2Client from "./lib/Http2Client";

dotenv.config()

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const kafka = new Kafka({
    clientId: 'zeebe-connector',
    brokers: ['localhost:9093']
})

const consumer = kafka.consumer({groupId: 'zeebe-connector'})

const http2Session = Http2Client.connect("https://127.0.0.1:4000");
http2Session.on('reconnect', (connectionAttemptNumber, reconnectDelay) => {
    console.log(`[http/2] session reconnect, attempt #${connectionAttemptNumber} scheduled in ${reconnectDelay}ms`);
});

http2Session.on('connect', () => {
    console.log('[http/2] session connected');
});

http2Session.on('error', (err) => {
    console.error(`[http/2] error code: ${err.code}, syscall: ${err.syscall}, address: ${err.address}, port: ${err.port}`);
});

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({topic: "zeebe"})

    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
            if (!message.value)
                return;

            const payloadAsString = message.value.toString();

            if (!http2Session.connected) {
                const resume = pause();
                http2Session.once('connect', resume);
                throw "[http/2] session is not connected";

            } else {
                const req = http2Session.request({
                    ':method': "POST",
                    ':path': `/events`,
                    'x-message-type': 'event',
                    'x-event-type': "zeebe"
                    //'authorization': `Bearer ${access_token}`,
                });
                req.write(payloadAsString);
                req.end();
            }

            console.log(`[kafka] processed ${topic}/${partition}/${message.offset}`);
        },
    })
}

run().catch(console.error)


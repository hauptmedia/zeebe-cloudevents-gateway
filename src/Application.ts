import dotenv from "dotenv";
import {Command} from "commander";
import {HttpServer} from "./cloudevents/consumer/HttpServer";
import {HttpSender} from "./cloudevents/producer/HttpSender";

dotenv.config();

export class Application {
    run() {
  /*      const dbConfig = config.get('Customer.dbConfig');
        console.log(dbConfig);
*/
        const program = new Command()
            .description('Zeebe Cloudevents Gateway')
            .option('--insecure', 'Allow self-signed TLS certificates', false);

        program.parse();
        const options = program.opts();

        if(options['insecure'])
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

        const ceConsumer = new HttpServer();
        ceConsumer.start();

        const ceProducer = new HttpSender();
        ceProducer.start();
    }
}
import http2, {ClientSessionOptions, SecureClientSessionOptions} from "node:http2";
import ClientHttp2DurableSession from "./ClientHttp2DurableSession";
import url from "node:url";


export interface Http2ClientOptions extends SecureClientSessionOptions {
    /**
     * The delay, in milliseconds, before trying to reconnect first time.
     * Default value is 250.
     */
    reconnectStartDelay: number

    /**
     * The reconnectStartDelay is multiplied by the reconnectMultiplier to increase the delay between reattempts.
     * Default value is 2.
     */
    reconnectMultiplier: number,

    /**
     * Number between 0 and 1 specifying the variance range that should be added to the delay.
     * e.g. 0.1 = 10%
     *
     * Default: 0.1
     */
    reconnectVarianceFactor: number;

    /**
     *  The maximum delay, in milliseconds, between two consecutive attempts.
     *  Default value is 180000 = 3 min.
     */
    reconnectMaxDelay: number;
}


const defaultHttp2ClientOptions : Http2ClientOptions = {
    reconnectStartDelay: 250,
    reconnectMultiplier: 2,
    reconnectVarianceFactor: 0.1,
    reconnectMaxDelay: 180000 /* 3 min */
}

export default class Http2Client {
    static connect(authority: string | url.URL, options?: Http2ClientOptions): ClientHttp2DurableSession {
        const mergedOptions = Object.assign(defaultHttp2ClientOptions, options),
              session = new ClientHttp2DurableSession(authority, mergedOptions);

        session.connect();
        return session;
    }
}
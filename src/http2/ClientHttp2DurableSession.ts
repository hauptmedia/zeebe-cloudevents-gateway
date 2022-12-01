import * as http2 from "node:http2";
import {
    ClientHttp2Session,
    ClientHttp2Stream,
    ClientSessionRequestOptions,
    Http2Stream,
    IncomingHttpHeaders,
    Settings
} from "node:http2";
import url from "node:url";
import {OutgoingHttpHeaders} from "node:http";
import EventEmitter from "events";
import {Http2ClientOptions} from "./Http2Client";


export default class ClientHttp2DurableSession extends EventEmitter {
    protected authority: string | url.URL;
    protected options: Http2ClientOptions;
    protected session?: ClientHttp2Session | null = null;

    private connectionAttemptNumber = 0;
    private reconnectTimer: NodeJS.Timeout | null = null;
    private _connected: boolean = false;
    private _destroyed: boolean = false;

    constructor(authority: string | url.URL, options: Http2ClientOptions) {
        super();
        this.authority = authority;
        this.options = options;
    }

    get connected(): boolean {
        return this._connected;
    }


    connect() {
        this._connected = false;
        /*
         * Every Http2Session instance is associated with exactly one net.Socket or tls.TLSSocket when it is created.
         * When either the Socket or the Http2Session are destroyed, both will be destroyed.
         */
        this.session = http2.connect(this.authority, this.options);
        this.session.on('close', this._handleClose.bind(this));
        this.session.on('connect', this._handleConnect.bind(this));
        this.session.on('error', this._handleError.bind(this));
        this.session.on('frameError', this._handleFrameError.bind(this));
        this.session.on('goaway', this._handleGoaway.bind(this));
        this.session.on('localSettings', this._handleLocalSettings.bind(this));
        this.session.on('ping', this._handlePing.bind(this));
        this.session.on('remoteSettings', this._handleRemoteSettings.bind(this));
        this.session.on('stream', this._handleStream.bind(this));
        this.session.on('timeout', this._handleTimeout.bind(this));
        this.session.on('altsvc', this._handleAltsvc.bind(this));
        this.session.on('origin', this._handleOrigin.bind(this));

        this.connectionAttemptNumber++;
    }

    /**
     * Immediately terminates the Http2Session and the associated net.Socket or tls.TLSSocket.
     *
     * Once destroyed, the Http2Session will emit the 'close' event. If error is not undefined, an 'error' event
     * will be emitted immediately before the 'close' event.
     *
     * If there are any remaining open Http2Streams associated with the Http2Session, those will also be destroyed.
     *
     * @param error An Error object if the Http2Session is being destroyed due to an error.
     * @param code The HTTP/2 error code to send in the final GOAWAY frame. If unspecified, and error is not undefined,
     * the default is INTERNAL_ERROR, otherwise defaults to NO_ERROR.
     */
    destroy(error?: Error, code?: number) {
        if(this.reconnectTimer !== null)
            clearTimeout(this.reconnectTimer);

        if(this.session) {
            this.session.removeAllListeners();
            this.session.destroy(error, code);
            this.session = null;
        }
        this._connected = false;
        this._destroyed = true;
    }

    /**
     * Calculates the delay in ms for auto reconnect
     * @protected
     */
    protected _calcReconnectDelay(): number {
        const constant = this.options.reconnectStartDelay,
            base = this.options.reconnectMultiplier,
            power = this.connectionAttemptNumber;

        let delay = constant * Math.pow(base, power);

        delay = Math.min(delay, this.options.reconnectMaxDelay);

        if (this.options.reconnectVarianceFactor > 0) {
            const factor = this.options.reconnectVarianceFactor;
            delay = delay + Math.round(Math.random() * (delay * factor));
        }

        return delay;
    }

    /**
     * The 'close' event is emitted once the Http2Session has been destroyed. Its listener does not expect any arguments.
     */
    protected _handleClose() {
        this._connected = false;
        this.session?.removeAllListeners();

        const reconnectDelay = this._calcReconnectDelay();

        this.emit('reconnect', this.connectionAttemptNumber + 1, reconnectDelay);

        const self = this;
        this.reconnectTimer = setTimeout(() => {
            self.connect();
        }, reconnectDelay);

        this.emit('close');
    }

    /**
     * The 'connect' event is emitted once the Http2Session has been successfully connected to the remote peer
     * and communication may begin.
     */
    protected _handleConnect() {
        this.connectionAttemptNumber = 0;
        this.reconnectTimer = null;
        this._connected = true;

        this.emit('connect');
    }

    /**
     * The 'error' event is emitted when an error occurs during the processing of an Http2Session.
     */
    protected _handleError(err: any) {
        this.emit('error', err);
    }

    /**
     * The 'frameError' event is emitted when an error occurs while attempting to send a frame on the session.
     * If the frame that could not be sent is associated with a specific Http2Stream, an attempt to emit a
     * 'frameError' event on the Http2Stream is made.
     *
     * If the 'frameError' event is associated with a stream, the stream will be closed and destroyed
     * immediately following the 'frameError' event. If the event is not associated with a stream,
     * the Http2Session will be shut down immediately following the 'frameError' event.
     */
    protected _handleFrameError() {
        this.emit('frameError');
    }

    /**
     * The 'goaway' event is emitted when a GOAWAY frame is received.
     * @param errorCode The HTTP/2 error code specified in the GOAWAY frame
     * @param lastStreamID The ID of the last stream the remote peer successfully processed (or 0 if no ID is specified).
     * @param opaqueData If additional opaque data was included in the GOAWAY frame, a Buffer instance will be passed containing that data.
     */
    protected _handleGoaway(errorCode: number, lastStreamID: number, opaqueData: Buffer) {
        this.emit('goaway', errorCode, lastStreamID, opaqueData);
    }

    /**
     * The 'localSettings' event is emitted when an acknowledgment SETTINGS frame has been received.
     * When using http2session.settings() to submit new settings, the modified settings do not take effect
     * until the 'localSettings' event is emitted.
     * @param settings A copy of the SETTINGS frame received
     * @protected
     */
    protected _handleLocalSettings(settings: Settings) {
        this.emit('localSettings', settings);
    }

    /**
     * The 'ping' event is emitted whenever a PING frame is received from the connected peer.
     * @param payload The PING frame 8-byte payload
     */
    protected _handlePing(payload: Buffer) {
        this.emit('ping', payload);
    }

    /**
     * The 'remoteSettings' event is emitted when a new SETTINGS frame is received from the connected peer.
     * @param settings A copy of the SETTINGS frame received
     */
    protected _handleRemoteSettings(settings: Settings) {
        this.emit('remoteSettings', settings);
    }

    /**
     * The 'stream' event is emitted when a new Http2Stream is created.
     * @param stream A reference to the stream
     * @param headers An object describing the headers
     * @param flags The associated numeric flags
     * @param rawHeaders An array containing the raw header names followed by their respective values
     */
    protected _handleStream(stream: Http2Stream, headers: IncomingHttpHeaders, flags: number, rawHeaders: any) {
        this.emit('stream', stream, headers, flags, rawHeaders);
    }

    /**
     * After the http2session.setTimeout() method is used to set the timeout period for this Http2Session,
     * the 'timeout' event is emitted if there is no activity on the Http2Session after the configured number of
     * milliseconds.
     */
    protected _handleTimeout() {
        this.emit('timeout');
    }

    /**
     * The 'altsvc' event is emitted whenever an ALTSVC frame is received by the client. The event is emitted
     * with the ALTSVC value, origin, and stream ID. If no origin is provided in the ALTSVC frame,
     * origin will be an empty string.
     * @param alt
     * @param origin
     * @param streamId
     * @protected
     */
    protected _handleAltsvc(alt: string, origin: string, streamId: number) {
        this.emit('altsvc', alt, origin, streamId);
    }

    /**
     * The 'origin' event is emitted whenever an ORIGIN frame is received by the client. The event is emitted
     * with an array of origin strings. The http2session.originSet will be updated to include the received origins.
     * @param origins
     * @protected
     */
    protected _handleOrigin(origins: string[]) {
        this.emit('origin', origins);
    }

    /**
     * Creates and returns an Http2Stream instance that can be used to send an HTTP/2 request to the connected server.
     * When a ClientHttp2Session is first created, the socket may not yet be connected. if clienthttp2session.request()
     * is called during this time, the actual request will be deferred until the socket is ready to go. If the session
     * is closed before the actual request be executed, an ERR_HTTP2_GOAWAY_SESSION is thrown.
     * @param headers
     * @param options
     */
    public request(headers?: OutgoingHttpHeaders, options?: ClientSessionRequestOptions): ClientHttp2Stream {
        if(this._destroyed)
            throw new Error("Session is already destroyed");

        return this.session?.request(headers, options) as ClientHttp2Stream;
    }

}
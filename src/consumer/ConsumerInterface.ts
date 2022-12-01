export interface ConsumerInterface {
    start(cb: (data: string, pause: () => () => void) => void): Promise<void>;
}
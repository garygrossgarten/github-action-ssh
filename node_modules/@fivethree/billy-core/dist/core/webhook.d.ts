import { AppController } from './app';
export declare class WebHook {
    private controller;
    private server;
    private app;
    constructor(controller: AppController);
    /**
     * start the webhooks server
     *
     * @param {number} [port=7777]
     * @memberof CoreApi
     */
    startWebhooks(port?: number): void;
    private startWebhook;
    /**
     * Stop webhooks server
     *
     * @memberof CoreApi
     */
    stopWebhooks(): void;
}

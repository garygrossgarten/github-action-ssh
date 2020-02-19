import { AppController } from './app';
import { WebHook } from './webhook';
import { Scheduler } from './scheduler';
import { HistoryEntry, HistoryAction } from "../types";
/**
 * The CoreApi Class can be used to interact with the core application.
 *
 * @export
 * @class CoreApi
 */
export default class CoreApi {
    private controller;
    webhooks: WebHook;
    scheduler: Scheduler;
    constructor(controller: AppController);
    /**
     * Presents the Selection Screen
     *
     * @returns
     * @memberof CoreApi
     */
    promptLaneAndRun(): Promise<void>;
    getHistory(): HistoryEntry[];
    addToHistory(...historyItem: HistoryEntry[]): void;
    getLatestHistoryEntry(): {
        latest: HistoryEntry;
        addToHistory: (...historyItem: HistoryAction[]) => void;
    };
    printHistory(): void;
    private getHistoryContent;
}

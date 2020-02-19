import { HistoryEntry } from "../types";
export declare class History {
    private entries;
    addToHistory(...historyItem: HistoryEntry[]): void;
    getHistory(): HistoryEntry[];
    getLatest(): HistoryEntry;
    clear(): void;
}

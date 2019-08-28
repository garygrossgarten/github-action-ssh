import CoreApi from "../core/api";
export interface AppOptions {
    name?: string;
    description?: string;
    allowUnknownOptions?: boolean;
}
export interface CommandOptions {
    alias?: string;
    description: string;
}
export interface ActionOptions {
    description?: (...args: any[]) => string;
    addToHistory?: boolean;
}
export interface ParamOptions {
    name: string;
    description: string;
    gitStyle?: boolean;
    optional?: boolean;
    validators?: Validator[];
}
export declare class Validator {
    validate: (param: any) => boolean | Promise<boolean>;
    mapBefore?: (param: any) => any | Promise<any>;
    mapAfter?: (param: any) => any | Promise<any>;
    invalidText?: (name: string, param: any) => string;
}
export declare type HookName = 'ON_START' | 'ERROR' | 'BEFORE_ALL' | 'AFTER_ALL' | 'BEFORE_EACH' | 'AFTER_EACH';
export interface Context {
    name: string;
    description: string;
    directory: string;
    workingDirectory: string;
    api: CoreApi;
}
export interface HistoryAction {
    description: string;
    name: string;
    time?: number;
}
export interface HistoryEntry {
    type: 'Command' | 'Hook' | 'Webhook' | 'Job' | 'Action';
    time: number;
    name: string;
    description: string;
    history?: HistoryAction[];
}

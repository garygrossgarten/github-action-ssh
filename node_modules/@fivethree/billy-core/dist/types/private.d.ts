import { CommandOptions, ParamOptions, HookName, ActionOptions } from "./";
export interface CommandModel {
    name: string;
    options: CommandOptions;
}
export interface ActionModel {
    name: string;
    plugin: string;
    description?: string;
    options?: ActionOptions;
}
export interface JobModel {
    name: string;
    schedule: string;
    lane: CommandModel;
    scheduler: any;
}
export interface HookModel {
    type: HookName;
    lane: CommandModel;
}
export interface ParamModel {
    name: string;
    propertyKey: string;
    value?: any;
    index: number;
    options: ParamOptions;
}
export interface WebhookModel {
    path: string;
    lane: CommandModel;
}
export interface ContextModel {
    propertyKey: string;
    contextIndex: number;
}
export interface BodyModel {
    propertyKey: string;
    contextIndex: number;
}
export interface ErrorModel {
    propertyKey: string;
    contextIndex: number;
}
export interface Wrapable {
    name: string;
}

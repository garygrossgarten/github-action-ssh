import { ParamOptions, AppOptions, HookName, CommandOptions, ActionOptions } from "../types";
/**
 *
 *
 * @export
 * @param {AppOptions} [config]
 * @returns
 */
export declare function App(config?: AppOptions): (target: any) => void;
/**
 *
 *
 * @export
 * @param {(string | CommandOptions)} options
 * @returns
 */
export declare function Command(options: string | CommandOptions): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 *
 * @export
 * @param {(string | any)} schedule
 * @returns
 */
export declare function Job(schedule: string | any): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 *
 * @export
 * @param {HookName} hook
 * @returns
 */
export declare function Hook(hook: HookName): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 *
 * @export
 * @param {string} path
 * @returns
 */
export declare function Webhook(path: string): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 *
 * @export
 * @param {string} name
 * @returns
 */
export declare function Plugin(name: string): (target: Function) => void;
/**
 *
 *
 * @export
 * @param {string} description
 * @returns
 */
export declare function Action(description: string | ActionOptions): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 *
 * @export
 * @param {ParamOptions} options
 * @returns
 */
export declare function param(options: ParamOptions): (target: Object, propertyKey: string, parameterIndex: number) => void;
/**
 *
 *
 * @export
 * @returns
 */
export declare function context(): (target: Object, propertyKey: string, parameterIndex: number) => void;
/**
 *
 *
 * @export
 * @returns
 */
export declare function body(): (target: Object, propertyKey: string, parameterIndex: number) => void;
/**
 *
 *
 * @export
 * @returns
 */
export declare function error(): (target: Object, propertyKey: string, parameterIndex: number) => void;

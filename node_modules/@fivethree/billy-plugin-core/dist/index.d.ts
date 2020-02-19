/// <reference types="node" />
import { ChildProcess } from "child_process";
export interface CorePlugin {
}
export declare class CorePlugin {
    wait(dur: number): Promise<void>;
    parseJSON(path: string): any;
    writeJSON(path: string, content: any): void;
    readFile(path: string): string;
    writeFile(path: string, content: any): void;
    prompt(args: any[] | string): Promise<any>;
    exists(path: string): boolean;
    exec(command: string, print?: boolean, detached?: boolean): Promise<ChildProcess>;
    billy(path?: string): boolean;
    colorize(color: string, input: string): string;
    bump(version: string, message: string, path?: string): Promise<any>;
    camelcase(s: string, pascalCase?: boolean): any;
}

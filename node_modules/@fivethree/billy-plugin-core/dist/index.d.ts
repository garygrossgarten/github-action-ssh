/// <reference types="node" />
import { GitPlugin } from "@fivethree/billy-plugin-git";
import { ChildProcess } from "child_process";
export interface CorePlugin extends GitPlugin {
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

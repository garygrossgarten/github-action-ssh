#!/usr/bin/env node
import { CorePlugin } from "@fivethree/billy-plugin-core";
import { GithubActionsPlugin } from "@garygrossgarten/billy-plugin-github-actions";
export interface SSH extends CorePlugin, GithubActionsPlugin {
}
export declare class SSH {
    ssh(command: string, host: string, username: string, port: number, privateKey: string, password: string, passphrase: string, tryKeyboard: boolean): Promise<void>;
    private connect;
    private executeCommand;
}

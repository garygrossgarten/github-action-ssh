#!/usr/bin/env node
import { CorePlugin } from "@fivethree/billy-plugin-core";
import { GithubActionsPlugin } from "@garygrossgarten/billy-plugin-github-actions";
export interface Hello extends CorePlugin, GithubActionsPlugin {
}
export declare class Hello {
    hello(name: any): Promise<void>;
}

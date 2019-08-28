#!/usr/bin/env node
import { App, Hook, onStart, usesPlugins } from "@fivethree/billy-core";
import { CorePlugin } from "@fivethree/billy-plugin-core";
import {
  GithubActionsPlugin,
  input,
  GitHubAction
} from "@garygrossgarten/billy-plugin-github-actions";

export interface Hello extends CorePlugin, GithubActionsPlugin {}
@App()
export class Hello {
  @usesPlugins(CorePlugin, GithubActionsPlugin)
  @Hook(onStart)
  @GitHubAction()
  async hello(@input("name") name) {
    console.log(`Hello ${name}!`);
  }
}

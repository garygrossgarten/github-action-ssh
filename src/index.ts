#!/usr/bin/env node
import { App, Hook, onStart, usesPlugins } from "@fivethree/billy-core";
import { CorePlugin } from "@fivethree/billy-plugin-core";
import {
  GithubActionsPlugin,
  input,
  GitHubAction
} from "@garygrossgarten/billy-plugin-github-actions";
import core from "@actions/core";

import node_ssh from "node-ssh";
import { keyboardFunction } from "./keyboard";

export interface SSH extends CorePlugin, GithubActionsPlugin {}
@App()
export class SSH {
  @usesPlugins(CorePlugin, GithubActionsPlugin)
  @Hook(onStart)
  @GitHubAction()
  async ssh(
    @input("command") command: string,
    @input("host") host = "localhost",
    @input("username") username: string,
    @input("port") port = 22,
    @input("privateKey") privateKey: string,
    @input("password") password: string,
    @input("passphrase") passphrase: string,
    @input("tryKeyboard") tryKeyboard: boolean
  ) {
    const ssh = await this.connect(
      host,
      username,
      port,
      privateKey,
      password,
      passphrase,
      tryKeyboard
    );

    await this.executeCommand(ssh, command);

    ssh.dispose();
  }

  private async connect(
    host = "localhost",
    username: string,
    port = 22,
    privateKey: string,
    password: string,
    passphrase: string,
    tryKeyboard: boolean
  ) {
    const ssh = new node_ssh();
    const m1 = await this.colorize(
      "orange",
      `Establishing a SSH connection to ${host}.`
    );
    console.log(m1);

    try {
      await ssh.connect({
        host: host,
        port: port,
        username: username,
        password: password,
        passphrase: passphrase,
        privateKey: privateKey,
        tryKeyboard: tryKeyboard,
        onKeyboardInteractive: tryKeyboard ? keyboardFunction(password) : null
      });
      console.log(`🤝 Connected to ${host}.`);
    } catch (err) {
      console.error(`⚠️ The GitHub Action couldn't connect to ${host}.`, err);
      process.abort();
    }

    return ssh;
  }

  private async executeCommand(ssh: node_ssh, command: string) {
    const m2 = await this.colorize("orange", `Executing command:`);
    console.log(`${m2} ${command}`);

    try {
      const result = await ssh.exec(command, [], {
        stream: "both",
        onStdout(chunk) {
          console.log(chunk.toString("utf8"));
        },
        onStderr(chunk) {
          console.log(chunk.toString("utf8"));
        }
      });

      if (result.stderr.length) {
        throw new Error(result.stderr);
      }

      console.log("✅ SSH Action finished.");
    } catch (err) {
      console.error(`⚠️ An error happened executing command ${command}.`, err);
      core.setFailed(err.message);
      process.abort();
    }
  }
}

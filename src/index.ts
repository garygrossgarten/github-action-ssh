import * as core from '@actions/core';
import node_ssh from 'node-ssh';
import {keyboardFunction} from './keyboard';

async function run() {
  const command: string = core.getInput('command');
  const host: string = core.getInput('host') || 'localhost';
  const username: string = core.getInput('username');
  const port: number = +core.getInput('port') || 22;
  const privateKey: string = core.getInput('privateKey');
  const password: string = core.getInput('password');
  const passphrase: string = core.getInput('passphrase');
  const tryKeyboard: boolean = !!core.getInput('tryKeyboard');
  try {
    const ssh = await connect(
      host,
      username,
      port,
      privateKey,
      password,
      passphrase,
      tryKeyboard
    );

    await executeCommand(ssh, command);

    ssh.dispose();
  } catch (err) {
    core.setFailed(err);
  }

}

async function connect(
  host = 'localhost',
  username: string,
  port = 22,
  privateKey: string,
  password: string,
  passphrase: string,
  tryKeyboard: boolean
) {
  const ssh = new node_ssh();
  console.log(`Establishing a SSH connection to ${host}.`);

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
    core.setFailed(err.message);
  }

  return ssh;
}

async function executeCommand(ssh: node_ssh, command: string) {
  console.log(`Executing command: ${command}`);

  try {
    await ssh.exec(command, [], {
      stream: "both",
      onStdout(chunk) {
        console.log(chunk.toString("utf8"));
      },
      onStderr(chunk) {
        console.log(chunk.toString("utf8"));
      }
    });

    console.log("✅ SSH Action finished.");
  } catch (err) {
    console.error(`⚠️ An error happened executing command ${command}.`, err);
    core.setFailed(err.message);
    process.abort();
  }
}

run();

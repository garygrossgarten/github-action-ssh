import { Plugin, Action, usesPlugins } from '@fivethree/billy-core';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { GitPlugin } from '@fivethree/billy-plugin-git';
const { prompt } = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;
const camelCase = require('camelcase');

export interface CorePlugin extends GitPlugin { }

@Plugin('billy-plugin-core')
export class CorePlugin {
    @usesPlugins(GitPlugin) this;


    @Action('print in console')
    print(...args: string[] | any[]) {
        console.log(...args);
    }

    @Action('wait')
    async wait(dur: number): Promise<void> {
        console.log(`wait for ${dur}ms!`)
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('done waiting');
                resolve();
            }, dur);
        })
    }

    @Action('parseJSON')
    parseJSON(path: string) {
        if (existsSync(path)) {
            return JSON.parse(readFileSync(path, 'utf8'));
        } else {
            throw new Error(`Couldn't find file at path: ${path}.`);
        }
    }

    @Action('writeJSON')
    writeJSON(path: string, content: any) {
        return writeFileSync(path, JSON.stringify(content, null, 4));
    }

    @Action('read file from disk')
    readText(path: string) {
        if (existsSync(path)) {
            return readFileSync(path, 'utf8');
        } else {
            throw new Error(`Couldn't find file at path: ${path}.`);
        }
    }

    @Action('write file to disk')
    writeText(path: string, content: any) {
        return writeFileSync(path, content);
    }

    @Action('prompt')
    async prompt(args: any[] | string) {
        if (typeof args === 'string') {
            return (await prompt([
                {
                    name: 'answer',
                    message: args,
                }
            ])).answer;
        } else {
            return await prompt(...args);
        }
    }

    @Action('exists')
    exists(path: string): boolean {
        return existsSync(path);
    }

    @Action('exec')
    async exec(command: string | string[], printToConsole = false) {
        if (printToConsole) {
            return new Promise((resolve, reject) => {
                const child = spawn(command, { shell: true, stdio: "inherit" });
                child.on('close', (code, signal) => {
                    resolve({ code, signal });
                });
            });
        } else {
            return await exec(command);
        }
    }

    @Action('billy')
    billy(path = '.'): boolean {
        return existsSync(path + '/node_modules/@fivethree/billy-core');
    }

    @Action('bump')
    async bump(version: string, message: string, path?: string) {
        let m = `bump(${version})`;
        m = message ? m + ': ' + message : m;
        return path ? await exec(`git --git-dir=${path}/.git --work-tree=${path} add -A && git --git-dir=${path}/.git --work-tree=${path} commit -m "${m}"`) : await exec(`git add -A && git commit -m "${m}"`);
    }

    @Action('camelcase')
    camelcase(s: string, pascalCase: boolean = false) {
        const camel = camelCase(s);
        if (pascalCase) {
            return camel.charAt(0).toUpperCase() + camel.slice(1);
        }
        return camel;
    }
}

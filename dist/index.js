#!/usr/bin/env node
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const billy_core_1 = require("@fivethree/billy-core");
const billy_plugin_core_1 = require("@fivethree/billy-plugin-core");
const billy_plugin_github_actions_1 = require("@garygrossgarten/billy-plugin-github-actions");
const core_1 = __importDefault(require("@actions/core"));
const node_ssh_1 = __importDefault(require("node-ssh"));
const keyboard_1 = require("./keyboard");
let SSH = class SSH {
    ssh(command, host = "localhost", username, port = 22, privateKey, password, passphrase, tryKeyboard) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssh = yield this.connect(host, username, port, privateKey, password, passphrase, tryKeyboard);
            yield this.executeCommand(ssh, command);
            ssh.dispose();
        });
    }
    connect(host = "localhost", username, port = 22, privateKey, password, passphrase, tryKeyboard) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssh = new node_ssh_1.default();
            const m1 = yield this.colorize("orange", `Establishing a SSH connection to ${host}.`);
            console.log(m1);
            try {
                yield ssh.connect({
                    host: host,
                    port: port,
                    username: username,
                    password: password,
                    passphrase: passphrase,
                    privateKey: privateKey,
                    tryKeyboard: tryKeyboard,
                    onKeyboardInteractive: tryKeyboard ? keyboard_1.keyboardFunction(password) : null
                });
                console.log(`🤝 Connected to ${host}.`);
            }
            catch (err) {
                console.error(`⚠️ The GitHub Action couldn't connect to ${host}.`, err);
                process.abort();
            }
            return ssh;
        });
    }
    executeCommand(ssh, command) {
        return __awaiter(this, void 0, void 0, function* () {
            const m2 = yield this.colorize("orange", `Executing command:`);
            console.log(`${m2} ${command}`);
            try {
                const errors = [];
                yield ssh.exec(command, [], {
                    stream: "both",
                    onStdout(chunk) {
                        console.log(chunk.toString("utf8"));
                    },
                    onStderr(chunk) {
                        errors.push(chunk);
                        console.log(chunk.toString("utf8"));
                    }
                });
                if (errors.length) {
                    throw new Error(errors.join("\n"));
                }
                console.log("✅ SSH Action finished.");
            }
            catch (err) {
                console.error(`⚠️ An error happened executing command ${command}.`, err);
                core_1.default.setFailed(err.message);
                process.abort();
            }
        });
    }
};
__decorate([
    billy_core_1.usesPlugins(billy_plugin_core_1.CorePlugin, billy_plugin_github_actions_1.GithubActionsPlugin),
    billy_core_1.Hook(billy_core_1.onStart),
    billy_plugin_github_actions_1.GitHubAction(),
    __param(0, billy_plugin_github_actions_1.input("command")),
    __param(1, billy_plugin_github_actions_1.input("host")),
    __param(2, billy_plugin_github_actions_1.input("username")),
    __param(3, billy_plugin_github_actions_1.input("port")),
    __param(4, billy_plugin_github_actions_1.input("privateKey")),
    __param(5, billy_plugin_github_actions_1.input("password")),
    __param(6, billy_plugin_github_actions_1.input("passphrase")),
    __param(7, billy_plugin_github_actions_1.input("tryKeyboard")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], SSH.prototype, "ssh", null);
SSH = __decorate([
    billy_core_1.App()
], SSH);
exports.SSH = SSH;

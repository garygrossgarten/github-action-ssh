"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const node_ssh_1 = __importDefault(require("node-ssh"));
const keyboard_1 = require("./keyboard");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const command = core.getInput('command');
        const host = core.getInput('host') || 'localhost';
        const username = core.getInput('username');
        const port = +core.getInput('port') || 22;
        const privateKey = core.getInput('privateKey');
        const password = core.getInput('password');
        const passphrase = core.getInput('passphrase');
        const tryKeyboard = !!core.getInput('tryKeyboard');
        try {
            const ssh = yield connect(host, username, port, privateKey, password, passphrase, tryKeyboard);
            yield executeCommand(ssh, command);
            ssh.dispose();
        }
        catch (err) {
            core.setFailed(err);
        }
    });
}
function connect(host = 'localhost', username, port = 22, privateKey, password, passphrase, tryKeyboard) {
    return __awaiter(this, void 0, void 0, function* () {
        const ssh = new node_ssh_1.default();
        console.log(`Establishing a SSH connection to ${host}.`);
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
            core.setFailed(err.message);
        }
        return ssh;
    });
}
function executeCommand(ssh, command) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Executing command: ${command}`);
        try {
            yield ssh.exec(command, [], {
                stream: "both",
                onStdout(chunk) {
                    console.log(chunk.toString("utf8"));
                },
                onStderr(chunk) {
                    console.log(chunk.toString("utf8"));
                }
            });
            console.log("✅ SSH Action finished.");
        }
        catch (err) {
            console.error(`⚠️ An error happened executing command ${command}.`, err);
            core.setFailed(err.message);
            process.abort();
        }
    });
}
run();

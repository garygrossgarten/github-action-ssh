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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util/util");
const history_1 = require("./history");
const inquirer_1 = require("inquirer");
const api_1 = __importDefault(require("./api"));
const hooks_1 = require("./hooks");
class AppController {
    constructor() {
        //holds the metadata of the method decorators
        this.commands = [];
        this.jobs = [];
        this.hooks = [];
        this.webhooks = [];
        this.actions = [];
        //holds the metadata of the method parameter decorators
        this.params = [];
        this.contexts = [];
        this.bodys = [];
        this.errors = [];
    }
    init(target, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.instance = new target();
            yield this.initCommands();
            yield this.initActions();
        });
    }
    initCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            return util_1.wrapForEach(this.instance, this.commands, (command) => __awaiter(this, void 0, void 0, function* () {
                yield this.runHook(hooks_1.beforeEach);
                const historyEntry = {
                    type: 'Command',
                    time: Date.now(),
                    name: command.name,
                    description: command.options.description,
                    history: []
                };
                this.history.addToHistory(historyEntry);
            }), () => __awaiter(this, void 0, void 0, function* () {
                yield this.runHook(hooks_1.afterEach);
            }));
        });
    }
    initActions() {
        return __awaiter(this, void 0, void 0, function* () {
            return util_1.wrapForEach(this.instance, this.actions, (action, ...args) => __awaiter(this, void 0, void 0, function* () {
                if (action.description || action.options.addToHistory) {
                    const desc = action.options && action.options.description ? action.options.description(...args) : action.description || '';
                    const historyEntry = {
                        description: desc,
                        name: action.name,
                        time: Date.now()
                    };
                    if (this.history.getLatest() && !this.history.getLatest().history) {
                        this.history.getLatest().history = [];
                    }
                    this.history.getLatest() && this.history.getLatest().history.push(historyEntry);
                }
            }));
        });
    }
    getHook(type) {
        return this.hooks.find(hook => hook.type === type);
    }
    run(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            this.history = new history_1.History();
            return commands.length > 0 ? yield this.runCommands(commands) : yield this.promptCommand();
        });
    }
    runCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!command) {
                return;
            }
            const params = yield this.getArgs(command);
            try {
                const ret = yield this.instance[command.name](...params);
                return ret;
            }
            catch (err) {
                yield this.handleCommandError(err);
            }
        });
    }
    handleCommandError(err) {
        return __awaiter(this, void 0, void 0, function* () {
            const h = this.getHook(hooks_1.onError);
            if (h && h.lane) {
                const params = yield this.getArgs(h.lane);
                const meta = this.errors.find(m => m.propertyKey === h.lane.name);
                if (meta) {
                    params.splice(meta.contextIndex, 0, err);
                }
                yield this.instance[h.lane.name](...params);
            }
            console.log(util_1.colorize('red', err));
            throw err;
        });
    }
    runHook(hook, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const h = this.getHook(hook);
            yield this.runCommand(h ? h.lane : null);
            return !!h;
        });
    }
    runCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runHook(hooks_1.beforeAll);
            yield util_1.processAsyncArray(commands, (command) => __awaiter(this, void 0, void 0, function* () {
                yield this.runCommand(command);
            }));
            yield this.runHook(hooks_1.afterAll);
            this.history.clear();
        });
    }
    promptCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.printCommands();
            const command = yield this.prompt();
            yield this.runCommands([command]);
        });
    }
    printCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            const table = util_1.createTable(["#", "Command", "Description"]);
            this.commands.forEach((command, index) => table.push([`${index + 1}`, command.name, command.options.description]));
            console.log(table.toString());
        });
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const question = [{
                    type: 'input',
                    name: 'command',
                    message: 'Please enter a number or command',
                    validate: (input) => this.validateInput(input)
                }];
            const answer = (yield inquirer_1.prompt(question)).command;
            return isNaN(answer) ? this.commands.find(l => l.name === answer) : this.commands[answer - 1];
        });
    }
    validateInput(input) {
        const validationError = (message) => {
            console.log(util_1.colorize('red', message));
            return false;
        };
        if (isNaN(+input)) {
            return this.commands.some(lane => lane.name === input ? true : validationError(`Couldn't find lane with name ${input}`));
        }
        return +input > 0 && +input <= this.commands.length ? true : validationError(' Specify a number between 1 and ' + this.commands.length);
    }
    getArgs(method) {
        return __awaiter(this, void 0, void 0, function* () {
            const contextMeta = this.contexts.find(m => m.propertyKey === method.name);
            const params = yield this.resolveParams(method);
            const resolved = params.map(p => p.value);
            if (contextMeta) {
                resolved.splice(contextMeta.contextIndex, 0, this.getContext(method));
            }
            return resolved;
        });
    }
    resolveParams(method) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params
                .filter(param => param.propertyKey === method.name)
                .sort((a, b) => a.index - b.index);
            if (params.length === 0) {
                return [];
            }
            let ret = [];
            yield util_1.processAsyncArray(params, (p) => __awaiter(this, void 0, void 0, function* () {
                const resolved = yield this.resolveParam(p);
                ret.push(resolved);
            }));
            return ret;
        });
    }
    resolveParam(p) {
        return __awaiter(this, void 0, void 0, function* () {
            if (p.options.optional && (!p.value && p.value !== false)) {
                return p;
            }
            if (!p.value) {
                const question = [{
                        name: 'answer',
                        message: p.options.description,
                    }];
                p.value = (yield inquirer_1.prompt(question)).answer;
            }
            return yield this.validateParam(p);
        });
    }
    validateParam(p) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!p.options.validators || p.options.validators.length === 0) {
                return p;
            }
            for (const validator of p.options.validators) {
                if (validator.mapBefore) {
                    p.value = yield validator.mapBefore(p.value);
                }
                const isValid = yield validator.validate(p.value);
                if (!isValid) {
                    console.log((yield util_1.colorize('red', validator.invalidText(p.name, p.value) || `${p.value} is not a valid parameter for ${p.name}`)));
                    p.value = null;
                    yield this.resolveParam(p);
                    break;
                }
                if (validator.mapAfter) {
                    p.value = yield validator.mapAfter(p.value);
                }
            }
            return p;
        });
    }
    getContext(lane) {
        const context = {
            name: lane.name,
            description: lane.options.description,
            directory: util_1.appDir,
            workingDirectory: process.cwd(),
            api: new api_1.default(this)
        };
        return context;
    }
}
exports.AppController = AppController;

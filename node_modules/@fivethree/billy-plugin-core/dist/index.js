"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var billy_core_1 = require("@fivethree/billy-core");
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var util = require("util");
var chalk_1 = __importDefault(require("chalk"));
var exec = util.promisify(require("child_process").exec);
var child_process_1 = require("child_process");
var camelCase = require("camelcase");
var CorePlugin = /** @class */ (function () {
    function CorePlugin() {
    }
    CorePlugin.prototype.wait = function (dur) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("wait for " + dur + "ms!");
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            console.log("done waiting");
                            resolve();
                        }, dur);
                    })];
            });
        });
    };
    CorePlugin.prototype.parseJSON = function (path) {
        if (fs_1.existsSync(path)) {
            return JSON.parse(fs_1.readFileSync(path, "utf8"));
        }
        else {
            throw new Error("Couldn't find file at path: " + path + ".");
        }
    };
    CorePlugin.prototype.writeJSON = function (path, content) {
        return fs_1.writeFileSync(path, JSON.stringify(content, null, 4));
    };
    CorePlugin.prototype.readFile = function (path) {
        if (fs_1.existsSync(path)) {
            return fs_1.readFileSync(path, "utf8");
        }
        else {
            throw new Error("Couldn't find file at path: " + path + ".");
        }
    };
    CorePlugin.prototype.writeFile = function (path, content) {
        return fs_1.writeFileSync(path, content);
    };
    CorePlugin.prototype.prompt = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof args === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_1.prompt([
                                {
                                    name: "answer",
                                    message: args
                                }
                            ])];
                    case 1: return [2 /*return*/, (_a.sent()).answer];
                    case 2: return [4 /*yield*/, inquirer_1.prompt.apply(void 0, args)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CorePlugin.prototype.exists = function (path) {
        return fs_1.existsSync(path);
    };
    CorePlugin.prototype.exec = function (command, print, detached) {
        if (print === void 0) { print = false; }
        if (detached === void 0) { detached = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!print) return [3 /*break*/, 2];
                        _b = (_a = console).log;
                        return [4 /*yield*/, this.colorize("orange", "> " + command)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var error;
                                var options = {
                                    shell: true,
                                    stdio: [0, 1, "pipe"]
                                };
                                var child = child_process_1.spawn(command, options);
                                child.stderr.on("data", function (data) {
                                    error = data.toString();
                                });
                                if (detached) {
                                    resolve(child);
                                }
                                child.on("close", function (code) {
                                    if (code !== 1) {
                                        resolve(child);
                                    }
                                    else {
                                        reject(error);
                                    }
                                });
                            })];
                    case 2: return [4 /*yield*/, exec(command)];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    CorePlugin.prototype.billy = function (path) {
        if (path === void 0) { path = "."; }
        return fs_1.existsSync(path + "/node_modules/@fivethree/billy-core");
    };
    CorePlugin.prototype.colorize = function (color, input) {
        return chalk_1.default.keyword(color)(input);
    };
    CorePlugin.prototype.bump = function (version, message, path) {
        return __awaiter(this, void 0, void 0, function () {
            var m, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        m = "bump(" + version + ")";
                        m = message ? m + ": " + message : m;
                        if (!path) return [3 /*break*/, 2];
                        return [4 /*yield*/, exec("git --git-dir=" + path + "/.git --work-tree=" + path + " add -A && git --git-dir=" + path + "/.git --work-tree=" + path + " commit -m \"" + m + "\"")];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, exec("git add -A && git commit -m \"" + m + "\"")];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                }
            });
        });
    };
    CorePlugin.prototype.camelcase = function (s, pascalCase) {
        if (pascalCase === void 0) { pascalCase = false; }
        var camel = camelCase(s);
        if (pascalCase) {
            return camel.charAt(0).toUpperCase() + camel.slice(1);
        }
        return camel;
    };
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (dur) { return "Waited for " + dur + "ms."; }
        })
    ], CorePlugin.prototype, "wait", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (path) { return "Parsed JSON file at path " + path; }
        })
    ], CorePlugin.prototype, "parseJSON", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (path) { return "Wrote JSON file at path " + path; }
        })
    ], CorePlugin.prototype, "writeJSON", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (path) { return "Read file at path " + path; }
        })
    ], CorePlugin.prototype, "readFile", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (path) { return "Wrote file at path " + path; }
        })
    ], CorePlugin.prototype, "writeFile", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: false
        })
    ], CorePlugin.prototype, "prompt", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: false
        })
    ], CorePlugin.prototype, "exists", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (command) { return "Executed command " + command + "."; }
        })
    ], CorePlugin.prototype, "exec", null);
    __decorate([
        billy_core_1.Action({ addToHistory: false })
    ], CorePlugin.prototype, "billy", null);
    __decorate([
        billy_core_1.Action({ addToHistory: false })
    ], CorePlugin.prototype, "colorize", null);
    __decorate([
        billy_core_1.Action({
            addToHistory: true,
            description: function (version, message) {
                return "Bumped Version " + version + ": " + message;
            }
        })
    ], CorePlugin.prototype, "bump", null);
    __decorate([
        billy_core_1.Action({ addToHistory: false })
    ], CorePlugin.prototype, "camelcase", null);
    CorePlugin = __decorate([
        billy_core_1.Plugin("billy-plugin-core")
    ], CorePlugin);
    return CorePlugin;
}());
exports.CorePlugin = CorePlugin;

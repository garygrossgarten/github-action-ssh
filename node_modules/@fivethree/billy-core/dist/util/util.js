"use strict";
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
const path_1 = require("path");
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const cli_table_1 = __importDefault(require("cli-table"));
function processAsyncArray(array, asyncFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const el of array) {
            yield asyncFunction(el);
        }
        ;
    });
}
exports.processAsyncArray = processAsyncArray;
function wrapForEach(instance, source, before, after) {
    return __awaiter(this, void 0, void 0, function* () {
        yield processAsyncArray(source, (s) => __awaiter(this, void 0, void 0, function* () {
            const original = instance[s.name].bind(instance);
            instance[s.name] = (...args) => __awaiter(this, void 0, void 0, function* () {
                if (before) {
                    yield before(s, ...args);
                }
                const ret = yield original(...args);
                if (after) {
                    yield after(s, ...args);
                }
                return ret;
            });
        }));
        return instance;
    });
}
exports.wrapForEach = wrapForEach;
function parseJSON(path) {
    return JSON.parse(fs_1.readFileSync(path, 'utf8'));
}
exports.parseJSON = parseJSON;
function exists(path) {
    return fs_1.existsSync(path);
}
exports.exists = exists;
function createTable(head, blank = false, color = 'green') {
    return new cli_table_1.default({
        head: head,
        style: { 'head': [color, 'bold'], 'padding-left': 1, 'padding-right': 2 },
        chars: blank ? {
            'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
            'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
            'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
            'right': '', 'right-mid': '', 'middle': ' '
        } : {}
    });
}
exports.createTable = createTable;
function colorize(color, input) {
    return chalk_1.default.keyword(color)(input);
}
exports.colorize = colorize;
function bold(input) {
    return chalk_1.default.bold(input);
}
exports.bold = bold;
function msToHuman(millisec) {
    const seconds = (millisec / 1000);
    const minutes = (millisec / (1000 * 60));
    const hours = (millisec / (1000 * 60 * 60));
    const days = (millisec / (1000 * 60 * 60 * 24));
    if (seconds < 60) {
        return seconds.toFixed(1) + " s";
    }
    else if (minutes < 60) {
        return minutes.toFixed(1) + " min";
    }
    else if (hours < 24) {
        return hours.toFixed(1) + " h";
    }
    else {
        return days.toFixed(1) + " days";
    }
}
exports.msToHuman = msToHuman;
function splitCommaSeperated(aliases) {
    if (aliases) {
        return aliases.replace(' ', '').split(',');
    }
}
exports.splitCommaSeperated = splitCommaSeperated;
exports.appDir = path_1.resolve(path_1.dirname(require.main.filename) + '/..');

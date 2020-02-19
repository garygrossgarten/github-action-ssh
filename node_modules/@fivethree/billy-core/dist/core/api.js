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
Object.defineProperty(exports, "__esModule", { value: true });
const webhook_1 = require("./webhook");
const scheduler_1 = require("./scheduler");
const util_1 = require("../util/util");
/**
 * The CoreApi Class can be used to interact with the core application.
 *
 * @export
 * @class CoreApi
 */
class CoreApi {
    constructor(controller) {
        this.controller = controller;
        this.webhooks = new webhook_1.WebHook(this.controller);
        this.scheduler = new scheduler_1.Scheduler(this.controller);
    }
    /**
     * Presents the Selection Screen
     *
     * @returns
     * @memberof CoreApi
     */
    promptLaneAndRun() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.controller.promptCommand();
        });
    }
    getHistory() {
        return this.controller.history.getHistory();
    }
    addToHistory(...historyItem) {
        return this.controller.history.addToHistory(...historyItem);
    }
    getLatestHistoryEntry() {
        const latest = this.controller.history.getLatest();
        const addToHistory = (...historyItem) => {
            latest.history.push(...historyItem);
        };
        return { latest: latest, addToHistory: addToHistory };
    }
    printHistory() {
        const now = Date.now();
        const table = util_1.createTable(["#", "Description"]);
        const history = this.getHistory();
        if (!history || history.length === 0) {
            return;
        }
        history.forEach((h, index) => {
            const content = this.getHistoryContent(history, h, index, now);
            table.push([`${index + 1}`, `${util_1.bold(h.type)}\n ${util_1.colorize('orange', '> ' + h.name)}\n${content}`]);
        });
        console.log('The application started at ' + new Date(history[0].time));
        console.log(table.toString());
        console.log('The application took ' + util_1.msToHuman(now - history[0].time));
    }
    getHistoryContent(history, h, index, now) {
        const duration = h && index + 1 < history.length ? history[index + 1].time - h.time : now - h.time;
        const table = util_1.createTable(["Name", "Description", "Duration"], true, 'white');
        h.history.forEach((his, i) => {
            const last = history.length > index + 1 ? history[index + 1].time - his.time : Date.now() - his.time;
            const dur = his && i + 1 < h.history.length ? h.history[i + 1].time - his.time : last;
            table.push([his.name, his.description.match(new RegExp('.{1,' + 60 + '}', 'g')).join('\n'), util_1.msToHuman(dur)]);
        });
        table.push(['', '', util_1.colorize('green', '~' + util_1.msToHuman(duration))]);
        return `${h.description}${h.history.length > 0 ? '\n\n' + table.toString() : ''}`;
    }
}
exports.default = CoreApi;

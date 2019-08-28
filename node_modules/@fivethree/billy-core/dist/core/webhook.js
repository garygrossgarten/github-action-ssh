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
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
class WebHook {
    constructor(controller) {
        this.controller = controller;
        this.app = express_1.default();
        this.app.use(bodyParser.json());
    }
    /**
     * start the webhooks server
     *
     * @param {number} [port=7777]
     * @memberof CoreApi
     */
    startWebhooks(port = 7777) {
        this.controller.webhooks
            .forEach(hook => this.startWebhook(hook));
        this.server = this.app.listen(port);
    }
    startWebhook(hook) {
        this.app.post(hook.path, (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.controller.history.addToHistory({ name: hook.lane.name, description: 'running webhook', type: 'Webhook', time: Date.now(), history: [] });
            res.sendStatus(200);
            const params = yield this.controller.getArgs(hook.lane);
            const meta = this.controller.bodys.find(m => m.propertyKey === hook.lane.name);
            if (meta) {
                params.splice(meta.contextIndex, 0, req.body);
            }
            try {
                const ret = yield this.controller.instance[hook.lane.name](...params);
                return ret;
            }
            catch (err) {
                yield this.controller.handleCommandError(err);
            }
        }));
    }
    /**
     * Stop webhooks server
     *
     * @memberof CoreApi
     */
    stopWebhooks() {
        if (!this.server) {
            return;
        }
        this.server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });
    }
}
exports.WebHook = WebHook;

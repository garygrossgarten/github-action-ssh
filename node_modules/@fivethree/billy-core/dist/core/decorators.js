"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const core = new core_1.Core();
/**
 *
 *
 * @export
 * @param {AppOptions} [config]
 * @returns
 */
function App(config) {
    return (target) => {
        core.controller
            .init(target, config)
            .then(() => {
            core.run(config);
        });
    };
}
exports.App = App;
/**
 *
 *
 * @export
 * @param {(string | CommandOptions)} options
 * @returns
 */
function Command(options) {
    return (target, propertyKey, descriptor) => {
        if (typeof options === 'string') {
            core.controller.commands.push({ name: propertyKey, options: { description: options } });
        }
        else {
            core.controller.commands.push({ name: propertyKey, options: options });
        }
    };
}
exports.Command = Command;
/**
 *
 *
 * @export
 * @param {(string | any)} schedule
 * @returns
 */
function Job(schedule) {
    return (target, propertyKey, descriptor) => {
        const job = { name: propertyKey, lane: { name: propertyKey, options: { description: null } }, schedule: schedule, scheduler: null };
        core.controller.jobs.push(job);
    };
}
exports.Job = Job;
/**
 *
 *
 * @export
 * @param {HookName} hook
 * @returns
 */
function Hook(hook) {
    return (target, propertyKey, descriptor) => {
        const h = { type: hook, lane: { name: propertyKey, options: { description: hook } } };
        core.controller.hooks.push(h);
    };
}
exports.Hook = Hook;
/**
 *
 *
 * @export
 * @param {string} path
 * @returns
 */
function Webhook(path) {
    return (target, propertyKey, descriptor) => {
        const hook = { path: path, lane: { name: propertyKey, options: { description: null } } };
        core.controller.webhooks.push(hook);
    };
}
exports.Webhook = Webhook;
/**
 *
 *
 * @export
 * @param {string} name
 * @returns
 */
function Plugin(name) {
    return (target) => {
    };
}
exports.Plugin = Plugin;
/**
 *
 *
 * @export
 * @param {string} description
 * @returns
 */
function Action(description) {
    return (target, propertyKey, descriptor) => {
        if (typeof description === 'string') {
            core.controller.actions.push({ name: propertyKey, plugin: target.constructor.name, description: description });
        }
        else {
            core.controller.actions.push({ name: propertyKey, plugin: target.constructor.name, options: description });
        }
    };
}
exports.Action = Action;
/**
 *
 *
 * @export
 * @param {ParamOptions} options
 * @returns
 */
function param(options) {
    return (target, propertyKey, parameterIndex) => {
        const param = {
            index: parameterIndex,
            name: options.name || propertyKey,
            propertyKey: propertyKey,
            options: options
        };
        core.controller.params.push(param);
    };
}
exports.param = param;
/**
 *
 *
 * @export
 * @returns
 */
function context() {
    return (target, propertyKey, parameterIndex) => {
        core.controller.contexts.push({ contextIndex: parameterIndex, propertyKey: propertyKey });
    };
}
exports.context = context;
/**
 *
 *
 * @export
 * @returns
 */
function body() {
    return (target, propertyKey, parameterIndex) => {
        core.controller.bodys.push({ contextIndex: parameterIndex, propertyKey: propertyKey });
    };
}
exports.body = body;
/**
 *
 *
 * @export
 * @returns
 */
function error() {
    return (target, propertyKey, parameterIndex) => {
        core.controller.errors.push({ contextIndex: parameterIndex, propertyKey: propertyKey });
    };
}
exports.error = error;

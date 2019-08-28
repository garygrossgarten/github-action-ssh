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
const node_schedule_1 = __importDefault(require("node-schedule"));
const hooks_1 = require("./hooks");
class Scheduler {
    constructor(controller) {
        this.controller = controller;
    }
    /**
     * start all the scheduled Jobs in your billy application
     *
     * @returns {JobModel[]}
     * @memberof CoreApi
     */
    startJobs() {
        this.controller
            .jobs.forEach(job => job = this.startJob(job));
        return this.controller.jobs;
    }
    /**
     * schedule a single job
     *
     * @param {JobModel} job job that will be scheduled
     * @returns {JobModel} returns the updated job, with scheduler attached
     * @memberof CoreApi
     */
    startJob(job) {
        const instance = node_schedule_1.default.scheduleJob(job.schedule, (fireDate) => __awaiter(this, void 0, void 0, function* () {
            this.controller.history.addToHistory({ name: job.lane.name, description: 'running scheduled lane', type: 'Job', time: Date.now(), history: [] });
            yield this.controller.runHook(hooks_1.beforeAll);
            yield this.controller.runCommand(job.lane);
            yield this.controller.runHook(hooks_1.afterAll);
            this.controller.history.clear();
        }));
        job.scheduler = instance;
        return job;
    }
    /**
     * cancel all scheduled lanes
     *
     * @returns {JobModel[]}
     * @memberof CoreApi
     */
    cancelJobs() {
        this.controller.jobs
            .forEach(job => {
            job.scheduler.cancel();
        });
        return this.controller.jobs;
    }
}
exports.Scheduler = Scheduler;

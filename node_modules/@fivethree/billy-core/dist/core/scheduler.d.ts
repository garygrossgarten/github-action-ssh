import { AppController } from './app';
import { JobModel } from '../types';
export declare class Scheduler {
    private controller;
    constructor(controller: AppController);
    /**
     * start all the scheduled Jobs in your billy application
     *
     * @returns {JobModel[]}
     * @memberof CoreApi
     */
    startJobs(): JobModel[];
    /**
     * schedule a single job
     *
     * @param {JobModel} job job that will be scheduled
     * @returns {JobModel} returns the updated job, with scheduler attached
     * @memberof CoreApi
     */
    private startJob;
    /**
     * cancel all scheduled lanes
     *
     * @returns {JobModel[]}
     * @memberof CoreApi
     */
    cancelJobs(): JobModel[];
}

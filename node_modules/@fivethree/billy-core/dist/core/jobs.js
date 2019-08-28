"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function every(value) {
    const ret = {
        seconds: `*/${value} * * * * *`,
        mins: `*/${value} * * * *`,
        hours: `* */${value} * * *`,
        days: `* * */${value} * *`,
        months: `* * * */${value} *`,
        dayOfWeek: `* * * * */${value}`,
    };
    return ret;
}
exports.every = every;

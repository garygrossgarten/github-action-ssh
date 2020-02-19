"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util/util");
exports.isNumber = {
    validate: (param) => !isNaN(param),
    invalidText: (param) => `The parameter ${param} should be a number.`
};
exports.isNumberArray = {
    validate: (mapped) => mapped.filter(p => exports.isNumber.validate(p)).length === 0,
    mapBefore: (list) => list.replace(', ', ',').split(','),
    invalidText: () => `Please specify a comma separated list of numbers.`
};
exports.isBoolean = {
    validate: (value) => ['false', 'true', true, false, 'yes', 'no', 'y', 'n', '1', '0'].some(s => s === value),
    mapAfter: (value) => {
        return ['true', true, 'yes', 'y', '1'].some(s => s === value);
    },
    invalidText: () => `The parameter should be of type boolean. (Usage: [true/false , y/n, ...])`
};
exports.isString = {
    validate: (param) => typeof param === 'string',
    invalidText: (param) => `The parameter ${param} should be a string.`
};
exports.isStringArray = {
    validate: (mapped) => mapped.filter(p => exports.isString.validate(p)).length === 0,
    mapBefore: (list) => list.replace(', ', ',').split(','),
    invalidText: () => `Please specify a comma seperated list.`
};
exports.isExistingPath = {
    validate: (param) => util_1.exists(param.startsWith('/') ? param : process.cwd() + '/' + param),
    invalidText: (param) => `File or directory ${param} doesn't exist. Please choose another one.`
};
exports.isNonExistingPath = {
    validate: (param) => !util_1.exists(param.startsWith('/') ? param : process.cwd() + '/' + param),
    invalidText: (param) => `File or directory ${param} already exists. Please choose another one.`
};

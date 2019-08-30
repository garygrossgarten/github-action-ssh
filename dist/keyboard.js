"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboardFunction = password => (name, instructions, instructionsLang, prompts, finish) => {
    if (prompts.length > 0 &&
        prompts[0].prompt.toLowerCase().includes("password")) {
        finish([password]);
    }
};

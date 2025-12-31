"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const globals_js_1 = require("./globals.js");
const engine_js_1 = require("./engine.js");
const create = (globals) => {
    const merged = {};
    for (const key in globals_js_1.GLOBALS) {
        merged[key] = {
            ...globals_js_1.GLOBALS[key],
            ...(globals?.[key] || {}),
        };
    }
    return new engine_js_1.IntentEngine(merged);
};
exports.create = create;

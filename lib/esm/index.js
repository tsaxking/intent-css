import { GLOBALS } from './globals.js.js';
import { IntentEngine } from './engine.js.js';
export const create = (globals) => {
    const merged = {};
    for (const key in GLOBALS) {
        merged[key] = {
            ...GLOBALS[key],
            ...(globals?.[key] || {}),
        };
    }
    return new IntentEngine(merged);
};

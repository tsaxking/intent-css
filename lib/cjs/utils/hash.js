"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const hash = (intent) => {
    const str = Object.entries({
        ...intent.intent,
        ...intent.raw,
    })
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => `${key}:${value}`)
        .join(';');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return `h${Math.abs(hash)}`;
};
exports.hash = hash;

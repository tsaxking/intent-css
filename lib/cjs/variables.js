"use strict";
const variables = {};
const set = (variable, value) => {
    variables[variable] = value;
};
const generate = () => {
    requestAnimationFrame(generate);
};
// do this because if we're doing ssr, it won't work
setTimeout(() => {
    try {
        if (!globalThis.document)
            return;
        requestAnimationFrame(generate);
    }
    catch {
        //
    }
});

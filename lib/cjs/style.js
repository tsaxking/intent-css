"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentEngine = void 0;
const component_js_1 = require("./components/component.js");
const globals_js_1 = require("./globals.js");
let exists = null;
class IntentEngine {
    globals;
    defaults;
    constructor(globals, defaults = {}) {
        this.globals = globals;
        this.defaults = defaults;
        if (exists) {
            throw new Error('IntentEngine is a singleton and has already been instantiated.');
        }
        exists = this;
    }
    components = new Map();
    text(intent, config) {
        const component = new component_js_1.Component({
            type: 'text',
            version: globals_js_1.INTENT_CSS_VERSION,
            intent: {
                border: 'none',
                color: 'foreground',
                size: 'md',
                weight: 'normal',
                highlight: 'none',
                margin: 'none',
                padding: 'none',
                radius: 'none',
                transition: 'none',
                ...intent,
            },
            raw: config?.raw || {},
            extends: config?.extends,
        });
        // I don't care if we replace it or not, the class id will be the same for the same intent
        this.components.set(component.class, component);
        return component.class;
    }
}
exports.IntentEngine = IntentEngine;

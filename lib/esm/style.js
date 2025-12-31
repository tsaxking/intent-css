import { Component } from './components/component.js';
import { INTENT_CSS_VERSION } from './globals.js';
let exists = null;
export class IntentEngine {
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
        const component = new Component({
            type: 'text',
            version: INTENT_CSS_VERSION,
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

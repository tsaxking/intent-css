import { Component } from './components/component.js';
import { type Globals, type PartialGlobals, GLOBALS } from './globals.js';
import { type IntentTypeMap, type IntentConfig } from './intent.js';
import { INTENT_CSS_VERSION } from './globals.js';

type BaseGlobals = typeof GLOBALS;

export type MergeGlobals<G extends PartialGlobals> = Globals<
  (G['breakpoints'] extends Record<string, any> ? G['breakpoints'] : {}) & BaseGlobals['breakpoints'],
  (G['colors'] extends Record<string, any> ? G['colors'] : {}) & BaseGlobals['colors'],
  (G['spacing'] extends Record<string, any> ? G['spacing'] : {}) & BaseGlobals['spacing'],
  (G['fontSizes'] extends Record<string, any> ? G['fontSizes'] : {}) & BaseGlobals['fontSizes'],
  (G['radii'] extends Record<string, any> ? G['radii'] : {}) & BaseGlobals['radii'],
  (G['layers'] extends Record<string, any> ? G['layers'] : {}) & BaseGlobals['layers'],
  (G['fontWeights'] extends Record<string, any> ? G['fontWeights'] : {}) & BaseGlobals['fontWeights'],
  (G['borders'] extends Record<string, any> ? G['borders'] : {}) & BaseGlobals['borders'],
  (G['transitions'] extends Record<string, any> ? G['transitions'] : {}) & BaseGlobals['transitions']
>;

let exists: IntentEngine<any> | null = null;

export class IntentEngine<G extends Globals = Globals> {
    constructor(public globals: G, public defaults: Partial<IntentTypeMap<G>> = {}) {
        if (exists) {
            throw new Error('IntentEngine is a singleton and has already been instantiated.');
        }
        exists = this;
    }

    private readonly components = new Map<string, Component<G, keyof IntentTypeMap<G>>>();

    text(intent?: IntentTypeMap<G>['text'], config?: IntentConfig<G, 'text'>) {
        const component = new Component<G, 'text'>({
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

    // block(intent?: IntentTypeMap<G>['block'], config?: IntentConfig<G, 'block'>) {}

    // init() {}
}
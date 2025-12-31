import { Component } from './components/component.js';
import { type Globals, type PartialGlobals, defaultConfig, GLOBALS } from './globals.js';
import { type IntentTypeMap, type IntentConfig } from './intent.js';
import { INTENT_CSS_VERSION } from './globals.js';
import { genBaseCss, type BaseCssConfig } from './base.js';
import { ColorVariant, generateColorVariant, validatePallette } from './utils/color.js';
import { genRootCss } from './root.js';
import { BlockComponent } from './components/block.js';
import { TextComponent } from './components/text.js';

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

export type IntentEngineConfig<G extends Globals> = {
    globals: G;
    defaults?: Partial<IntentTypeMap<G>>;
    declaration?: Partial<BaseCssConfig<G>>;
    prefix?: string;
}

let exists: IntentEngine<any> | null = null;

export class IntentEngine<G extends Globals = Globals> {
    constructor(public config: IntentEngineConfig<G>) {
        if (exists) {
            throw new Error('IntentEngine is a singleton and has already been instantiated.');
        }
        exists = this;
    }

    get prefix () {
        return this.config.prefix || defaultConfig.prefix;
    }

    get defaults(): IntentTypeMap<G> {
        return Object.entries(this.config.defaults || {}).reduce((acc, [key, value]) => {
            acc[key as keyof IntentTypeMap<G>] = {
                ...(defaultConfig.intents as any)[key],
                ...this.config.defaults?.[key as keyof IntentTypeMap<G>],
                ...value,
            };
            return acc;
        }, {} as IntentTypeMap<G>);
    }

    getStyle(): HTMLStyleElement {
        const s = document.querySelector('style[data-intent-css]');
        if (s) {
            return s as HTMLStyleElement;
        }
        const style = document.createElement('style');
        style.setAttribute('data-intent-css', 'true');
        document.head.appendChild(style);
        return style;
    }

    init() {
        return genRootCss(this, {
            prefix: this.config.prefix,
        });
    }

    setStyle() {
        const style = this.getStyle();
        const root = this.init();
        const base = genBaseCss(this);
        style.innerHTML = root + '\n' + base;
    }

    getColors(): {
        [key in keyof G['colors']]: ColorVariant;
    } {
        const colors = this.config.globals.colors;
        const result = validatePallette(colors);
        if (!result.isValid) {
            console.warn('Warning: Some issues were found in your color pallette:', result.warnings);
        }

        const generated: {
            [key in keyof G['colors']]: ColorVariant;
        } = Object.entries(colors).reduce((acc, [key, value]) => {
            acc[key as keyof G['colors']] =  generateColorVariant(value);
            return acc;
        }, {} as {
            [key in keyof G['colors']]: ColorVariant;
        });
        return generated;
    }

    private readonly components = new Map<string, Component<G, keyof IntentTypeMap<G>>>();

    text(intent?: IntentTypeMap<G>['text'], config?: IntentConfig<G, 'text'>) {
        const component = new TextComponent(this as any, {
            type: 'text',
            version: INTENT_CSS_VERSION,
            intent: {
                ...intent,
            },
            raw: config?.raw || {},
            extends: config?.extends,
        });
        component.init();
        this.components.set(component.class, component);
        return component.class;
    }

    block(intent?: IntentTypeMap<G>['block'], config?: IntentConfig<G, 'block'>) {
        const component = new BlockComponent(this as any, {
            type: 'block',
            version: INTENT_CSS_VERSION,
            intent: {
                ...intent,
            },
            raw: config?.raw || {},
            extends: config?.extends,
        });
        component.init()
        this.components.set(component.class, component);
        return component.class;
    }

}
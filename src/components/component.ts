import { BaseIntent, ClassId, IntentTypeMap } from '../intent.js';
import { defaultConfig, type Globals } from '../globals.js';
import { hash } from '../utils/hash.js';
import { IntentEngine } from '../engine.js';

export class Component<G extends Globals, K extends keyof IntentTypeMap<G>> {
    constructor(public readonly engine: IntentEngine<G>, public readonly config: BaseIntent<G, K>) {

    };

    get class(): ClassId {
        return `${this.engine.config.prefix || defaultConfig.prefix}_${this.config.type}_${hash(this.config as any)}`;
    }

    get intent() {
        return {
            ...this.engine.defaults,
            ...this.config.intent,
        }
    }

    genCss() {
        throw new Error('Not implemented');
    }

    
    init() {
        const style = this.engine.getStyle();
        let css = style.innerHTML;
        css += `\n\n${this.genCss()}`;
        style.innerHTML = css;
    }
};
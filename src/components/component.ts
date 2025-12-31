import { BaseIntent, ClassId, IntentTypeMap } from '../intent.js';
import { type Globals } from '../globals.js';
import { hash } from '../utils/hash.js';

export type ComponentConfig = {
    extends?: ClassId;
    raw?: Partial<CSSStyleDeclaration>;
};


export class Component<G extends Globals, K extends keyof IntentTypeMap<G>> {
    constructor(public readonly intentObj: BaseIntent<G, K>) {};

    get class(): ClassId {
        return `${this.intentObj.type}_${hash(this.intentObj as any)}`;
    }
};
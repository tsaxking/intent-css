import { BaseIntent, ClassId, IntentTypeMap } from '../intent.js';
import { type Globals } from '../globals.js';
export type ComponentConfig = {
    extends?: ClassId;
    raw?: Partial<CSSStyleDeclaration>;
};
export declare class Component<G extends Globals, K extends keyof IntentTypeMap<G>> {
    readonly intentObj: BaseIntent<G, K>;
    constructor(intentObj: BaseIntent<G, K>);
    get class(): ClassId;
}

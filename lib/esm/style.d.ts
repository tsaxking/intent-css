import { type Globals, type PartialGlobals, GLOBALS } from './globals.js';
import { type IntentTypeMap, type IntentConfig } from './intent.js';
type BaseGlobals = typeof GLOBALS;
export type MergeGlobals<G extends PartialGlobals> = Globals<(G['breakpoints'] extends Record<string, any> ? G['breakpoints'] : {}) & BaseGlobals['breakpoints'], (G['colors'] extends Record<string, any> ? G['colors'] : {}) & BaseGlobals['colors'], (G['spacing'] extends Record<string, any> ? G['spacing'] : {}) & BaseGlobals['spacing'], (G['fontSizes'] extends Record<string, any> ? G['fontSizes'] : {}) & BaseGlobals['fontSizes'], (G['radii'] extends Record<string, any> ? G['radii'] : {}) & BaseGlobals['radii'], (G['layers'] extends Record<string, any> ? G['layers'] : {}) & BaseGlobals['layers'], (G['fontWeights'] extends Record<string, any> ? G['fontWeights'] : {}) & BaseGlobals['fontWeights'], (G['borders'] extends Record<string, any> ? G['borders'] : {}) & BaseGlobals['borders'], (G['transitions'] extends Record<string, any> ? G['transitions'] : {}) & BaseGlobals['transitions']>;
export declare class IntentEngine<G extends Globals = Globals> {
    globals: G;
    defaults: Partial<IntentTypeMap<G>>;
    constructor(globals: G, defaults?: Partial<IntentTypeMap<G>>);
    private readonly components;
    text(intent?: IntentTypeMap<G>['text'], config?: IntentConfig<G, 'text'>): `${string}_h${number}`;
}
export {};

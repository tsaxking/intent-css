import { type Hash } from './utils/hash.js';
import { type Globals } from './globals.js';
export type ClassId = `${string}_${Hash}`;

export type VisualIntent<G extends Globals> = {
    color?: keyof G['colors'];
    size?: keyof G['fontSizes'];
    weight?: keyof G['fontWeights'];
    highlight?: keyof G['colors'];
    margin?: keyof G['spacing'];
    padding?: keyof G['spacing'];
    radius?: keyof G['radii'];
    border?: keyof G['borders'];
    transition?: keyof G['transitions'];
}

export type IntentTypeMap<G extends Globals> = {
    text: {
        color?: keyof G['colors'];
        size?: keyof G['fontSizes'];
        weight?: keyof G['fontWeights'];
        highlight?: keyof G['colors'];
        margin?: keyof G['spacing'];
        padding?: keyof G['spacing'];
        radius?: keyof G['radii'];
        border?: keyof G['borders'];
        transition?: keyof G['transitions'];
    };
    block: {

    }
};

export type IntentConfig<G extends Globals, _K extends keyof IntentTypeMap<G>> = {
    extends?: ClassId;
    raw?: Partial<CSSStyleDeclaration>;
}

export interface BaseIntent<G extends Globals, K extends keyof IntentTypeMap<G>> {
    type: K;
    version: string;
    intent: IntentTypeMap<G>[K];
    raw: Partial<CSSStyleDeclaration>;
    extends?: ClassId;
}
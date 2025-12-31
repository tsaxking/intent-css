import { type Hash } from './utils/hash.js';
import { type Globals } from './globals.js';
import { type ExtendColor } from './utils/color.js';
import { type Key } from './globals.js';

export type ClassId = `${string}_${Hash}`;

export type VisualIntent<G extends Globals> = {
    color?: ExtendColor<Key<G['colors']>>;
    size?: Key<G['fontSizes']>;
    weight?: Key<G['fontWeights']>;
    highlight?: Key<G['colors']>;
    margin?: Key<G['spacing']>;
    padding?: Key<G['spacing']>;
    radius?: Key<G['radii']>;
    border?: Key<G['borders']>;
    transition?: Key<G['transitions']>;
}

export type Flow = 'flow-x' | 'flow-y' | 'none' | 'center' | 'center-x' | 'center-y' | 'flow-x-reverse' | 'flow-y-reverse';
export type Position = 'normal' | 'center' | 'overlay' | 'start' | 'end';

export type IntentTypeMap<G extends Globals> = {
    text: {
        color?: ExtendColor<Key<G['colors']>>;
        size?: Key<G['fontSizes']>;
        weight?: Key<G['fontWeights']>;
        highlight?: ExtendColor<Key<G['colors']>>;
    };
    block: {
        flow?: Flow;
        wrap?: boolean;
        position?: Position;
        color?: ExtendColor<Key<G['colors']>>;
        radius?: Key<G['radii']>;
        border?: Key<G['borders']>;
        padding?: Key<G['spacing']>;
        margin?: Key<G['spacing']>;
        gap?: Key<G['spacing']>;
    };
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
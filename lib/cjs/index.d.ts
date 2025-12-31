import { type PartialGlobals } from './globals.js';
import { IntentEngine, type MergeGlobals } from './engine.js';
export declare const create: <G extends PartialGlobals = {}>(globals?: G) => IntentEngine<MergeGlobals<G>>;

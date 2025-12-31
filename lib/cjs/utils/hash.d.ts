import { type Globals } from "../globals";
import { type BaseIntent, type IntentTypeMap } from "../intent";
export type Hash = `h${number}`;
export declare const hash: (intent: BaseIntent<Globals, keyof IntentTypeMap<Globals>>) => Hash;

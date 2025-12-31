import { GLOBALS, type PartialGlobals } from './globals.js';
import { IntentEngine, type MergeGlobals } from './engine.js';

export const create = <G extends PartialGlobals = {}>(globals?: G) => {
  const merged = {} as any;
  for (const key in GLOBALS) {
    (merged as any)[key] = {
      ...(GLOBALS as any)[key],
      ...((globals as any)?.[key] || {}),
    }
  }

  return new IntentEngine<MergeGlobals<G>>(merged);
}
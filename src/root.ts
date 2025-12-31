import { IntentEngine } from "./engine";
import { Globals } from "./globals";

export const genRootCss = <G extends Globals>(
    engine: IntentEngine<G>,
    config: {
        prefix?: string;
    }
) => {
    let css = ':root {';
    const prefix = config.prefix ? config.prefix + '-' : 'intent-';

    // breakpoints
    for (const [key, value] of Object.entries(engine.config.globals.breakpoints)) {
        css += `\n    --${prefix}breakpoint-${key}: ${value};`;
    }

    const generated = engine.getColors();

    // colors
    for (const [key, value] of Object.entries(generated)) {
        css += `\n    --${prefix}color-${key}: ${value.base};`;
        for (const [variantKey, variantValue] of Object.entries(value)) {
            css += `\n    --${prefix}color-${key}-${variantKey}: ${variantValue};`;
        }
    }

    // spacing
    for (const [key, value] of Object.entries(engine.config.globals.spacing)) {
        css += `\n    --${prefix}spacing-${key}: ${value};`;
    }

    // fontSizes
    for (const [key, value] of Object.entries(engine.config.globals.fontSizes)) {
        css += `\n    --${prefix}font-size-${key}: ${value};`;
    }

    // radii
    for (const [key, value] of Object.entries(engine.config.globals.radii)) {
        css += `\n    --${prefix}radius-${key}: ${value};`;
    }

    // layers
    for (const [key, value] of Object.entries(engine.config.globals.layers)) {
        css += `\n    --${prefix}layer-${key}: ${value};`;
    }

    // fontWeights
    for (const [key, value] of Object.entries(engine.config.globals.fontWeights)) {
        css += `\n    --${prefix}font-weight-${key}: ${value};`;
    }

    // borders
    for (const [key, value] of Object.entries(engine.config.globals.borders)) {
        css += `\n    --${prefix}border-${key}: ${value};`;
    }

    // transitions
    for (const [key, value] of Object.entries(engine.config.globals.transitions)) {
        css += `\n    --${prefix}transition-${key}: ${value};`;
    }

    css += '\n}';
    return css;
};
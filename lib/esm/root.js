export const genRootCss = (engine, config) => {
    let css = ':root {';
    // breakpoints
    for (const [key, value] of Object.entries(engine.globals.breakpoints)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}breakpoint-${key}: ${value};`;
    }
    // colors
    for (const [key, value] of Object.entries(engine.globals.colors)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}color-${key}: ${value};`;
    }
    // spacing
    for (const [key, value] of Object.entries(engine.globals.spacing)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}spacing-${key}: ${value};`;
    }
    // fontSizes
    for (const [key, value] of Object.entries(engine.globals.fontSizes)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}font-size-${key}: ${value};`;
    }
    // radii
    for (const [key, value] of Object.entries(engine.globals.radii)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}radius-${key}: ${value};`;
    }
    // layers
    for (const [key, value] of Object.entries(engine.globals.layers)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}layer-${key}: ${value};`;
    }
    // fontWeights
    for (const [key, value] of Object.entries(engine.globals.fontWeights)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}font-weight-${key}: ${value};`;
    }
    // borders
    for (const [key, value] of Object.entries(engine.globals.borders)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}border-${key}: ${value};`;
    }
    // transitions
    for (const [key, value] of Object.entries(engine.globals.transitions)) {
        css += `\n    --${config.prefix ? config.prefix + '-' : ''}transition-${key}: ${value};`;
    }
    css += '\n}';
    return css;
};

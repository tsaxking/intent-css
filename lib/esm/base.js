export const genBaseCss = (
//   engine: IntentEngine<G>,
config = {}) => {
    //   const tokens = config.tokens ?? engine.globals;
    const themeSelector = config.themeName ? `[data-theme="${config.themeName}"] ` : '';
    let css = '';
    // 1. CSS reset / normalize
    css += `
${themeSelector}*, ${themeSelector}*::before, ${themeSelector}*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

${themeSelector}body {
  font-family: var(--fontFamily-base, system-ui, sans-serif);
  font-size: var(--fontSize-md, 1rem);
  color: var(--colors-foreground, #000);
  background-color: var(--colors-background, #fff);
  line-height: var(--lineHeight-normal, 1.4);
}
`;
    const prefix = config.prefix ? config.prefix + '-' : '';
    // 2. Base text elements
    const texts = {
        p: 'margin: 0 0 1em 0;',
        h1: 'margin: 0 0 0.67em 0; font-weight: bold;',
        h2: 'margin: 0 0 0.75em 0; font-weight: bold;',
        h3: 'margin: 0 0 0.83em 0; font-weight: bold;',
        h4: 'margin: 0 0 1em 0; font-weight: bold;',
        h5: 'margin: 0 0 1.12em 0; font-weight: bold;',
        h6: 'margin: 0 0 1.5em 0; font-weight: bold;',
        a: 'color: inherit; text-decoration: underline;',
        strong: 'font-weight: bold;',
        em: 'font-style: italic;',
        ul: 'margin: 0 0 1em 1.5em; padding: 0;',
        ol: 'margin: 0 0 1em 1.5em; padding: 0;',
        li: 'margin: 0 0 0.5em 0;',
        blockquote: `margin: 0 0 1em 0; padding-left: var(--${prefix}spacing-4); border-left: var(--${prefix}borders-regular);`,
        code: `font-family: monospace; background-color: var(--${prefix}colors-background-muted, #f5f5f5); padding: var(--${prefix}spacing-1) var(--${prefix}spacing-2); border-radius: var(--${prefix}radii-sm);`,
        pre: `font-family: monospace; background-color: var(--${prefix}colors-background-muted, #f5f5f5); padding: var(--${prefix}spacing-4); border-radius: var(--${prefix}radii-sm); overflow-x: auto;`,
        b: 'font-weight: bold;',
        i: 'font-style: italic;',
    };
    for (const [tag, styleDecl] of Object.entries(texts)) {
        if (config.include && !config.include.includes(tag))
            continue;
        if (config.exclude && config.exclude.includes(tag))
            continue;
        css += `\n${themeSelector}${tag} { ${styleDecl} }`;
    }
    // 3. Base form elements
    const formElements = {
        button: 'border: none; cursor: pointer; background: var(--colors-primary); color: var(--colors-background); padding: 0.5em 1em; border-radius: var(--radii-sm); font-size: var(--fontSize-md);',
        input: 'border: 1px solid var(--colors-foreground); padding: 0.5em; border-radius: var(--radii-sm); font-size: var(--fontSize-md);',
        select: 'border: 1px solid var(--colors-foreground); padding: 0.5em; border-radius: var(--radii-sm); font-size: var(--fontSize-md);',
        textarea: 'border: 1px solid var(--colors-foreground); padding: 0.5em; border-radius: var(--radii-sm); font-size: var(--fontSize-md);',
        table: 'border-collapse: collapse; width: 100%;',
        th: 'text-align: left; padding: 0.5em; border-bottom: 1px solid var(--colors-foreground);',
        td: 'padding: 0.5em; border-bottom: 1px solid var(--colors-foreground);',
        img: 'display: block; max-width: 100%; height: auto;',
        hr: 'border: none; border-top: 1px solid var(--colors-foreground); margin: 1em 0;',
    };
    for (const [tag, styleDecl] of Object.entries(formElements)) {
        if (config.include && !config.include.includes(tag))
            continue;
        if (config.exclude && config.exclude.includes(tag))
            continue;
        css += `\n${themeSelector}${tag} { ${styleDecl} }`;
    }
    // 4. User overrides
    if (config.override) {
        for (const [tag, styleDecl] of Object.entries(config.override)) {
            css += `\n${themeSelector}${tag} { ${styleDecl} }`;
        }
    }
    return css;
};

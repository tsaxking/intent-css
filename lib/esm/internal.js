import * as csstree from 'css-tree';
import { INTENT_CSS_VERSION } from './globals';
const getStyle = () => {
    let el = document.head.querySelector(`style[data-intent-css="${INTENT_CSS_VERSION}"]`);
    if (!el) {
        el = document.createElement('style');
        el.setAttribute('data-intent-css', INTENT_CSS_VERSION);
        document.head.appendChild(el);
    }
    return el;
};
export class Segment {
    name;
    styles;
    static segments = {};
    constructor(name, styles) {
        this.name = name;
        this.styles = styles;
    }
    set(property, value) {
        // Update in-memory representation
        this.styles[property] = value;
        const style = getStyle();
        const css = style.textContent ?? '';
        try {
            const ast = csstree.parse(css, { positions: false });
            if (ast.type === 'StyleSheet') {
                const chunks = [];
                for (const node of ast.children) {
                    if (node.type === 'Rule') {
                        const selector = csstree.generate(node.prelude).trim();
                        if (selector === this.name) {
                            continue; // skip existing occurrences of this rule
                        }
                    }
                    chunks.push(csstree.generate(node));
                }
                const declarations = Object.entries(this.styles)
                    .map(([prop, val]) => `${prop}: ${val};`).join(' ');
                const newRule = `${this.name} { ${declarations} }`;
                chunks.push(newRule);
                style.textContent = chunks.join('\n');
            }
            else {
                // Non-stylesheet parse result: fallback
                const block = `${this.name} { ${property}: ${value}; }`;
                style.textContent = `${css}\n${block}`.trim();
            }
        }
        catch (e) {
            // Fallback: append a minimal rule block
            const block = `${this.name} { ${property}: ${value}; }`;
            style.textContent = `${css}\n${block}`.trim();
        }
    }
}
const getSegment = (seg) => {
    const existing = Segment.segments[seg];
    if (existing)
        return existing;
    const style = getStyle();
    /*
        Captures segments like:
        :root {
            --variable: value;
        }

        // or
        .className {
            height: 100px;
        }

        // and returns them as an object

        // if none found, creates a new one
    */
    const css = style.textContent ?? '';
    const styles = {};
    try {
        const ast = csstree.parse(css, { positions: false });
        if (ast.type === 'StyleSheet') {
            for (const ruleNode of ast.children) {
                if (ruleNode.type !== 'Rule')
                    continue;
                const selector = csstree.generate(ruleNode.prelude).trim();
                if (selector === seg) {
                    for (const declNode of ruleNode.block.children) {
                        if (declNode.type !== 'Declaration')
                            continue;
                        const property = declNode.property;
                        const value = csstree.generate(declNode.value).trim();
                        styles[property] = value;
                    }
                }
            }
        }
    }
    catch (e) {
        // Parsing failed; leave styles empty
    }
    const s = new Segment(seg, styles);
    Segment.segments[seg] = s;
    return s;
};
export const applyVariable = (variable, value) => {
    const seg = getSegment(':root');
    seg.set(`--${variable}`, value);
};
export const getClass = (className) => {
    return getSegment(`.${className}`);
};

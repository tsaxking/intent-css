"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClass = exports.applyVariable = exports.Segment = void 0;
const csstree = __importStar(require("css-tree"));
const globals_1 = require("./globals");
const getStyle = () => {
    let el = document.head.querySelector(`style[data-intent-css="${globals_1.INTENT_CSS_VERSION}"]`);
    if (!el) {
        el = document.createElement('style');
        el.setAttribute('data-intent-css', globals_1.INTENT_CSS_VERSION);
        document.head.appendChild(el);
    }
    return el;
};
class Segment {
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
exports.Segment = Segment;
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
const applyVariable = (variable, value) => {
    const seg = getSegment(':root');
    seg.set(`--${variable}`, value);
};
exports.applyVariable = applyVariable;
const getClass = (className) => {
    return getSegment(`.${className}`);
};
exports.getClass = getClass;

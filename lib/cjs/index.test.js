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
const csstree = __importStar(require("css-tree"));
const internal_1 = require("./internal");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Segment.set and CSS updates', () => {
    (0, vitest_1.beforeEach)(() => {
        // Reset intent style tag
        const existing = document.head.querySelector('style[data-intent-css="1.0.0"]');
        if (existing)
            existing.remove();
    });
    (0, vitest_1.it)('creates a new :root rule when missing and sets variable', () => {
        (0, internal_1.applyVariable)('primary', '#09f');
        const style = document.head.querySelector('style[data-intent-css="1.0.0"]');
        const ast = csstree.parse(style.textContent ?? '', { positions: false });
        let found = false;
        if (ast.type === 'StyleSheet') {
            for (const ruleNode of ast.children) {
                if (ruleNode.type !== 'Rule')
                    continue;
                const sel = csstree.generate(ruleNode.prelude).trim();
                if (sel === ':root') {
                    for (const decl of ruleNode.block.children) {
                        if (decl.type === 'Declaration' && decl.property === '--primary') {
                            const val = csstree.generate(decl.value).trim();
                            (0, vitest_1.expect)(val).toBe('#09f');
                            found = true;
                        }
                    }
                }
            }
        }
        (0, vitest_1.expect)(found).toBe(true);
    });
    (0, vitest_1.it)('updates an existing declaration value without duplicating it', () => {
        // Pre-populate a rule with a comment and a value
        const style = document.createElement('style');
        style.setAttribute('data-intent-css', '1.0.0');
        style.textContent = ':root { /* comment */ --primary: #fff; }';
        document.head.appendChild(style);
        (0, internal_1.applyVariable)('primary', '#000');
        const ast = csstree.parse(style.textContent ?? '', { positions: false });
        let count = 0;
        let value = '';
        if (ast.type === 'StyleSheet') {
            for (const ruleNode of ast.children) {
                if (ruleNode.type !== 'Rule')
                    continue;
                const sel = csstree.generate(ruleNode.prelude).trim();
                if (sel === ':root') {
                    for (const decl of ruleNode.block.children) {
                        if (decl.type === 'Declaration' && decl.property === '--primary') {
                            value = csstree.generate(decl.value).trim();
                            count++;
                        }
                    }
                }
            }
        }
        (0, vitest_1.expect)(count).toBe(1);
        (0, vitest_1.expect)(value).toBe('#000');
    });
});

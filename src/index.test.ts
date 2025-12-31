import * as csstree from 'css-tree';
import { applyVariable } from './internal';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Segment.set and CSS updates', () => {
	beforeEach(() => {
		// Reset intent style tag
		const existing = document.head.querySelector('style[data-intent-css="1.0.0"]');
		if (existing) existing.remove();
	});

	it('creates a new :root rule when missing and sets variable', () => {
		applyVariable('primary', '#09f');
		const style = document.head.querySelector('style[data-intent-css="1.0.0"]')!;
		const ast = csstree.parse(style.textContent ?? '', { positions: false });
		let found = false;
		if (ast.type === 'StyleSheet') {
			for (const ruleNode of ast.children) {
				if (ruleNode.type !== 'Rule') continue;
				const sel = csstree.generate(ruleNode.prelude).trim();
				if (sel === ':root') {
					for (const decl of ruleNode.block.children) {
						if (decl.type === 'Declaration' && decl.property === '--primary') {
							const val = csstree.generate(decl.value).trim();
							expect(val).toBe('#09f');
							found = true;
						}
					}
				}
			}
		}
		expect(found).toBe(true);
	});

	it('updates an existing declaration value without duplicating it', () => {
		// Pre-populate a rule with a comment and a value
		const style = document.createElement('style');
		style.setAttribute('data-intent-css', '1.0.0');
		style.textContent = ':root { /* comment */ --primary: #fff; }';
		document.head.appendChild(style);

		applyVariable('primary', '#000');

		const ast = csstree.parse(style.textContent ?? '', { positions: false });
		let count = 0;
		let value = '';
		if (ast.type === 'StyleSheet') {
			for (const ruleNode of ast.children) {
				if (ruleNode.type !== 'Rule') continue;
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
		expect(count).toBe(1);
		expect(value).toBe('#000');
	});
});

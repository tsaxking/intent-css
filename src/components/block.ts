import { type Globals } from "../globals";
import { Component } from "./component";

export class BlockComponent<G extends Globals> extends Component<G, 'block'> {
    genCss() {
        let css = `.${this.class} {`;
        const intent = this.intent;
        const raw = this.config.raw;

        const gap = () => css += `\n    `;
        gap();
        css += 'display: flex;';
        gap();

        if (intent.wrap) {
            css += 'flex-wrap: wrap;';
        } else {
            css += 'flex-wrap: nowrap;';
        }
        gap();

        if (intent.flow) {
            switch (intent.flow) {
                case 'none':
                    break;
                case 'flow-x':
                    css += `flex-direction: row;`;
                    break;
                case 'flow-y':
                    css += `flex-direction: column;`;
                    break;
                case 'center':
                    css += `justify-content: center; align-items: center;`;
                    break;
                case 'center-x':
                    css += `justify-content: center;`;
                    break;
                case 'center-y':
                    css += `align-items: center;`;
                    break;
                case 'flow-x-reverse':
                    css += `flex-direction: row-reverse;`;
                    break;
                case 'flow-y-reverse':
                    css += `flex-direction: column-reverse;`;
                    break;
            }
        }
        gap();

        if (intent.position) {
            switch (intent.position) {
                case 'normal':
                    break;
                case 'center':
                    css += 'justify-self: center;';
                    break;
                case 'end':
                    css += 'justify-self: end;';
                    break;
                case 'start':
                    css += 'justify-self: start;';
                    break;
                case 'overlay':
                    css += `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    `;
                    break;
            }
        }
        gap();

        if (intent.color) {
            css += `background-color: var(--${this.engine.prefix}-color-${intent.color});`;
        }
        gap();

        for (const [key, value] of Object.entries(raw)) {
            css += `${key}: ${value};`;
        }
        gap();

        if (intent.radius) {
            css += `border-radius: var(--${this.engine.prefix}-radius-${intent.radius});`;
        }
        gap();

        if (intent.border) {
            css += `border: var(--${this.engine.prefix}-border-${intent.border});`;
        }
        gap();

        if (intent.padding) {
            css += `padding: var(--${this.engine.prefix}-spacing-${intent.padding});`;
        }
        gap();

        if (intent.margin) {
            css += `margin: var(--${this.engine.prefix}-spacing-${intent.margin});`;
        }
        gap();

        if (intent.gap) {
            css += `gap: var(--${this.engine.prefix}-spacing-${intent.gap});`;
        }
        gap();

        css += '}';
        return css;
    }
    
};
import { type Globals } from "../globals";
import { Component } from "./component";

export class TextComponent<G extends Globals> extends Component<G, 'text'> {
    genCss() {
        let css = `.${this.class} {`;
        const intent = this.config.intent;
        const raw = this.config.raw;

        const prefix = this.engine.config.prefix || 'intent' ;

        if (intent.color) {
            css += `color: var(--${prefix}-color-${intent.color});`;
        }

        if (intent.size) {
            css += `font-size: var(--${prefix}-font-size-${intent.size});`;
        }

        if (intent.weight) {
            css += `font-weight: var(--${prefix}-font-weight-${intent.weight});`;
        }

        if (intent.highlight) {
            css += `background-color: var(--${prefix}-color-${intent.highlight});`;
        }

        for (const [key, value] of Object.entries(raw)) {
            css += `${key}: ${value};`;
        }
        css += '}';
        return css;
    }
};
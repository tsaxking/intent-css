import { type Globals } from './globals.js';
export type BaseCssConfig<G extends Globals> = {
    override?: Partial<CSSStyleDeclaration>;
    include?: (keyof HTMLElementTagNameMap)[];
    exclude?: (keyof HTMLElementTagNameMap)[];
    tokens?: G;
    themeName?: string;
    prefix?: string;
};
export declare const genBaseCss: <G extends Globals>(config?: BaseCssConfig<G>) => string;

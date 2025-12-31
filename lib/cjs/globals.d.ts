export type Global = Record<string, string>;
export type CoreSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type CoreColors = 'primary' | 'secondary' | 'background' | 'foreground';
export type CoreSpacing = '0' | '1' | '2' | '3' | '4' | '5';
export type CoreRadii = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type CoreLayers = 'base' | 'overlay' | 'modal' | 'popover' | 'tooltip';
export type CoreFontWeights = 'light' | 'regular' | 'medium' | 'bold' | 'black';
export type CoreBorders = 'thin' | 'light' | 'regular' | 'bold' | 'heavy';
export type CoreTransitions = 'fast' | 'normal' | 'slow';
export type GlobalBreakpoint = Record<CoreSizes, string>;
export type GlobalColor = Record<CoreColors, string>;
export type GlobalSpacing = Record<CoreSpacing, string>;
export type GlobalFontSize = Record<CoreSizes, string>;
export type GlobalRadii = Record<CoreRadii, string>;
export type GlobalLayers = Record<CoreLayers, string>;
export type GlobalFontWeights = Record<CoreFontWeights, string>;
export type GlobalBorders = Record<CoreBorders, string>;
export type GlobalTransitions = Record<CoreTransitions, string>;
export type Globals<BP extends GlobalBreakpoint = Global & GlobalBreakpoint, COL extends GlobalColor = Global & GlobalColor, SP extends GlobalSpacing = Global & GlobalSpacing, FS extends GlobalFontSize = Global & GlobalFontSize, RAD extends GlobalRadii = Global & GlobalRadii, Z extends GlobalLayers = Global & GlobalLayers, FW extends GlobalFontWeights = Global & GlobalFontWeights, BD extends GlobalBorders = Global & GlobalBorders, TS extends GlobalTransitions = Global & GlobalTransitions> = {
    breakpoints: BP;
    colors: COL;
    spacing: SP;
    fontSizes: FS;
    radii: RAD;
    layers: Z;
    fontWeights: FW;
    borders: BD;
    transitions: TS;
};
export type PartialGlobals<BP extends GlobalBreakpoint = Global & GlobalBreakpoint, COL extends GlobalColor = Global & GlobalColor, SP extends GlobalSpacing = Global & GlobalSpacing, FS extends GlobalFontSize = Global & GlobalFontSize, RAD extends GlobalRadii = Global & GlobalRadii, Z extends GlobalLayers = Global & GlobalLayers, FW extends GlobalFontWeights = Global & GlobalFontWeights, BD extends GlobalBorders = Global & GlobalBorders, TS extends GlobalTransitions = Global & GlobalTransitions> = {
    breakpoints?: Partial<BP>;
    colors?: Partial<COL>;
    spacing?: Partial<SP>;
    fontSizes?: Partial<FS>;
    radii?: Partial<RAD>;
    layers?: Partial<Z>;
    fontWeights?: Partial<FW>;
    borders?: Partial<BD>;
    transitions?: Partial<TS>;
};
export declare const GLOBALS: Globals<{
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
}, {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
}, {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
}, {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
}, {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
}, {
    base: string;
    overlay: string;
    modal: string;
    popover: string;
    tooltip: string;
}, {
    light: string;
    regular: string;
    medium: string;
    bold: string;
    black: string;
}, {
    thin: string;
    light: string;
    regular: string;
    bold: string;
    heavy: string;
}, {
    fast: string;
    normal: string;
    slow: string;
}>;
export declare const INTENT_CSS_VERSION = "1.0.0";

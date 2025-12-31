export type ColorVariant = {
    base: string;
    muted: string;
    hover: string;
    active: string;
    disabled: string;
};
export type Pallette = Record<string, ColorVariant>;
export declare const generateColorVariant: (colorStr: string) => ColorVariant;
export type ValiatePalletteResult = {
    validity: number;
    warnings: string[];
};
export declare const validatePallette: (pallette: Pallette) => ValiatePalletteResult;

import { Color } from "colors/color";

export type ColorVariant = {
    base: string;
    muted: string;
    hover: string;
    active: string;
    disabled: string;
};

export type Pallette = Record<string, ColorVariant>;

export const generateColorVariant = (colorStr: string): ColorVariant => {
    const color = new Color(colorStr);

    return {
        base: color.toString('hex'),
        muted: color.setAlpha(0.6).toString('rgba'),
        hover: color.hsla.setLightness(0.8).toString('hex'),
        active: color.hsla.setLightness(0.6).toString('hex'),
        disabled: color.setAlpha(0.3).toString('rgba'),
    };
}

export type ValiatePalletteResult = {
    validity: number;
    warnings: string[];
};

export const validatePallette = (pallette: Pallette): ValiatePalletteResult => {
    for (const [name, variant] of Object.entries(pallette)) {
        const base = new Color(variant.base);
        const sat = base.hsla.values[1];
    }
};
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
        muted: color.clone().setAlpha(0.6).toString('rgba'),
        hover: color.clone().setLightness(0.8).toString('hex'),
        active: color.clone().setLightness(0.6).toString('hex'),
        disabled: color.clone().setAlpha(0.3).toString('rgba'),
    };
}

export type ValiatePalletteResult = {
    isValid: boolean;
    warnings: string[];
};

export const validatePallette = (pallette: Record<string, string>): ValiatePalletteResult => {
    // ensure the saturation and lightness are within acceptable ranges of each other

    const warnings: string[] = [];
    const averageSaturation = Object.values(pallette).reduce((acc, variant) => {
        const color = new Color(variant);
        return acc + color.saturation;
    }, 0) / Object.values(pallette).length;
    const averageLightness = Object.values(pallette).reduce((acc, variant) => {
        const color = new Color(variant);
        return acc + color.lightness;
    }, 0) / Object.values(pallette).length;

    for (const [name, variant] of Object.entries(pallette)) {
        const color = new Color(variant);
        const saturationDiff = Math.abs(color.saturation - averageSaturation);
        const lightnessDiff = Math.abs(color.lightness - averageLightness);

        if (saturationDiff > 0.2) {
            warnings.push(`Color "${name}" has a saturation difference of ${saturationDiff.toFixed(2)} from the average saturation (${averageSaturation.toFixed(2)}).`);
        }
        if (lightnessDiff > 0.2) {
            warnings.push(`Color "${name}" has a lightness difference of ${lightnessDiff.toFixed(2)} from the average lightness (${averageLightness.toFixed(2)}).`);
        }
    }

    return {
        isValid: warnings.length === 0,
        warnings,
    };
};

export type ExtendColor<Color extends string | number | symbol> = Color | `${Extract<Color, string>}-${keyof ColorVariant}`;
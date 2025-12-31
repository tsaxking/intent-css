import { Color } from "colors/color";
export const generateColorVariant = (colorStr) => {
    const color = new Color(colorStr);
    return {
        base: color.toString('hex'),
        muted: color.setAlpha(0.6).toString('rgba'),
        hover: color.hsla.setLightness(0.8).toString('hex'),
        active: color.hsla.setLightness(0.6).toString('hex'),
        disabled: color.setAlpha(0.3).toString('rgba'),
    };
};
export const validatePallette = (pallette) => {
    for (const [name, variant] of Object.entries(pallette)) {
        const base = new Color(variant.base);
        const sat = base.hsla.values[1];
    }
};

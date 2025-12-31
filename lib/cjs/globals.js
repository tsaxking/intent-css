"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTENT_CSS_VERSION = exports.GLOBALS = void 0;
exports.GLOBALS = {
    breakpoints: {
        xs: '480px',
        sm: '768px',
        md: '992px',
        lg: '1200px',
        xl: '1600px',
        xxl: '2000px',
    },
    colors: {
        primary: '#0070f3',
        secondary: '#1c1c1e',
        background: '#ffffff',
        foreground: '#000000',
    },
    spacing: {
        '0': '0rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
    },
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem', // default
        lg: '1.125rem',
        xl: '1.25rem',
        xxl: '1.5rem',
    },
    radii: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '50%',
    },
    layers: {
        base: '0',
        overlay: '100',
        modal: '200',
        popover: '300',
        tooltip: '400',
    },
    fontWeights: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
        black: '900',
    },
    borders: {
        thin: '1px solid',
        light: '2px solid',
        regular: '4px solid',
        bold: '8px solid',
        heavy: '12px solid',
    },
    transitions: {
        fast: '150ms ease-in-out',
        normal: '300ms ease-in-out',
        slow: '500ms ease-in-out',
    },
};
exports.INTENT_CSS_VERSION = '1.0.0';

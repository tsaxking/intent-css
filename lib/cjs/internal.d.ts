export declare class Segment {
    name: string;
    styles: Record<string, string>;
    static readonly segments: Record<string, Segment>;
    constructor(name: string, styles: Record<string, string>);
    set(property: string, value: string): void;
}
export declare const applyVariable: (variable: string, value: string) => void;
export declare const getClass: (className: string) => Segment;

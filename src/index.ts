/**
 * Example styling utility function
 * This is a placeholder for your actual styling implementation
 */
export interface StyleOptions {
  color?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
}

/**
 * Creates a CSS class string from style options
 */
export function createStyle(options: StyleOptions): string {
  const styles: string[] = [];
  
  if (options.color) {
    styles.push(`color: ${options.color}`);
  }
  
  if (options.fontSize) {
    styles.push(`font-size: ${options.fontSize}`);
  }
  
  if (options.padding) {
    styles.push(`padding: ${options.padding}`);
  }
  
  if (options.margin) {
    styles.push(`margin: ${options.margin}`);
  }
  
  return styles.join('; ');
}

/**
 * Example class-based styling utility
 */
export class StyleBuilder {
  private styles: Map<string, string> = new Map();
  
  constructor() {}
  
  add(property: string, value: string): this {
    this.styles.set(property, value);
    return this;
  }
  
  remove(property: string): this {
    this.styles.delete(property);
    return this;
  }
  
  build(): string {
    return Array.from(this.styles.entries())
      .map(([prop, value]) => `${prop}: ${value}`)
      .join('; ');
  }
  
  clear(): this {
    this.styles.clear();
    return this;
  }
}

/**
 * Example utility to generate CSS classes
 */
export function generateClassName(prefix: string, suffix?: string): string {
  const base = `intent-${prefix}`;
  return suffix ? `${base}-${suffix}` : base;
}

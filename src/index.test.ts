import { describe, it, expect } from 'vitest';
import { createStyle, StyleBuilder, generateClassName } from './index';

describe('createStyle', () => {
  it('should create a style string from options', () => {
    const result = createStyle({
      color: 'red',
      fontSize: '16px',
    });
    
    expect(result).toBe('color: red; font-size: 16px');
  });
  
  it('should handle empty options', () => {
    const result = createStyle({});
    expect(result).toBe('');
  });
  
  it('should handle all style options', () => {
    const result = createStyle({
      color: 'blue',
      fontSize: '14px',
      padding: '10px',
      margin: '5px',
    });
    
    expect(result).toContain('color: blue');
    expect(result).toContain('font-size: 14px');
    expect(result).toContain('padding: 10px');
    expect(result).toContain('margin: 5px');
  });
});

describe('StyleBuilder', () => {
  it('should build styles using method chaining', () => {
    const builder = new StyleBuilder();
    const result = builder
      .add('color', 'green')
      .add('font-size', '18px')
      .build();
    
    expect(result).toContain('color: green');
    expect(result).toContain('font-size: 18px');
  });
  
  it('should remove styles', () => {
    const builder = new StyleBuilder();
    builder.add('color', 'red').add('font-size', '16px');
    builder.remove('color');
    const result = builder.build();
    
    expect(result).not.toContain('color');
    expect(result).toContain('font-size: 16px');
  });
  
  it('should clear all styles', () => {
    const builder = new StyleBuilder();
    builder.add('color', 'blue').add('padding', '10px');
    builder.clear();
    const result = builder.build();
    
    expect(result).toBe('');
  });
});

describe('generateClassName', () => {
  it('should generate a class name with prefix', () => {
    const result = generateClassName('button');
    expect(result).toBe('intent-button');
  });
  
  it('should generate a class name with prefix and suffix', () => {
    const result = generateClassName('button', 'primary');
    expect(result).toBe('intent-button-primary');
  });
});

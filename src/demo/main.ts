// Import the package functions from parent directory
import { createStyle, StyleBuilder, generateClassName } from '../index';

// Demo 1: StyleBuilder
const applyButton = document.getElementById('applyStyles') as HTMLButtonElement;
const styledBox = document.getElementById('styledBox') as HTMLDivElement;
const generatedCode = document.getElementById('generatedCode') as HTMLElement;

const colorInput = document.getElementById('color') as HTMLInputElement;
const fontSizeInput = document.getElementById('fontSize') as HTMLInputElement;
const paddingInput = document.getElementById('padding') as HTMLInputElement;
const marginInput = document.getElementById('margin') as HTMLInputElement;

applyButton?.addEventListener('click', () => {
  const color = colorInput.value;
  const fontSize = fontSizeInput.value;
  const padding = paddingInput.value;
  const margin = marginInput.value;
  
  // Using createStyle function
  const styleString = createStyle({
    color,
    fontSize,
    padding,
    margin,
  });
  
  // Apply styles to the box
  styledBox.setAttribute('style', styleString);
  
  // Show generated code
  generatedCode.textContent = `createStyle({\n  color: '${color}',\n  fontSize: '${fontSize}',\n  padding: '${padding}',\n  margin: '${margin}'\n})\n\n// Output:\n${styleString}`;
  
  // Also demonstrate StyleBuilder
  const builder = new StyleBuilder();
  builder
    .add('color', color)
    .add('font-size', fontSize)
    .add('padding', padding)
    .add('margin', margin);
  
  console.log('StyleBuilder output:', builder.build());
});

// Demo 2: Class Name Generator
const generateButton = document.getElementById('generateClass') as HTMLButtonElement;
const classOutput = document.getElementById('classOutput') as HTMLElement;

const prefixInput = document.getElementById('prefix') as HTMLInputElement;
const suffixInput = document.getElementById('suffix') as HTMLInputElement;

generateButton?.addEventListener('click', () => {
  const prefix = prefixInput.value;
  const suffix = suffixInput.value;
  
  const className = generateClassName(prefix, suffix || undefined);
  
  classOutput.textContent = `generateClassName('${prefix}'${suffix ? `, '${suffix}'` : ''})\n\n// Output:\n${className}`;
  
  console.log('Generated class name:', className);
});

// Initialize with default values on page load
console.log('Intent CSS Demo loaded successfully!');
console.log('Available exports:', { createStyle, StyleBuilder, generateClassName });

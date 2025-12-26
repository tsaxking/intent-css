# intent-css

A TypeScript styling package for creating and managing CSS styles programmatically.

## 🚀 Installation

```bash
pnpm install intent-css
```

## 📦 Usage

### ES Module

```typescript
import { createStyle, StyleBuilder, generateClassName } from 'intent-css';

// Create inline styles
const styles = createStyle({
  color: 'blue',
  fontSize: '16px',
  padding: '1rem',
});

// Use the StyleBuilder class
const builder = new StyleBuilder();
builder
  .add('color', 'red')
  .add('font-size', '18px')
  .build();

// Generate class names
const className = generateClassName('button', 'primary');
// Returns: 'intent-button-primary'
```

### CommonJS

```javascript
const { createStyle, StyleBuilder, generateClassName } = require('intent-css');
```

## 🛠️ Development

### Setup

```bash
# Install dependencies
pnpm install
```

### Available Scripts

```bash
# Run development server with demo
pnpm dev

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Build the package
pnpm build

# Preview production build
pnpm preview
```

### Project Structure

```
intent-css/
├── src/
│   ├── index.ts          # Main package exports
│   ├── index.test.ts     # Tests
│   └── demo/             # Demo application
│       ├── index.html
│       └── main.ts
├── dist/                 # Build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

## 🧪 Testing

This package uses Vitest for testing. Run tests with:

```bash
pnpm test
```

## 📝 License

See [LICENSE](LICENSE) file for details.
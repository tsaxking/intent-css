import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// Check if we're building the library or running dev server
const isLibBuild = process.env.LIB_BUILD === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: isLibBuild ? [
    dts({
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/demo/**/*'],
    }),
  ] : [],
  build: isLibBuild ? {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IntentCSS',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
      },
    },
  } : {
    outDir: resolve(__dirname, 'dist-demo'),
  },
  root: isLibBuild ? __dirname : './src/demo',
  publicDir: isLibBuild ? false : resolve(__dirname, 'src/demo/public'),
  server: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: ['dev.tsaxking.com']
  }
});

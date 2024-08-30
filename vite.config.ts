/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: [
      'src/components/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      'src/hooks/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      'src/utils/**/*.{test,spec}.?(c|m)[jt]s?(x)',
    ],
    coverage: {
      exclude: [
        '*.js',
        '*.ts',
        'dist/',
        'src/**/index.ts',
        'src/App.tsx',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/utils/constants.ts',
      ],
    },
  },
});

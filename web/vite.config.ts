import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import environmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin(), eslintPlugin(), environmentPlugin(['AUTH0_DOMAIN', 'AUTH0_CLIENTID'])],
  build: {
    outDir: 'build',
  },
});

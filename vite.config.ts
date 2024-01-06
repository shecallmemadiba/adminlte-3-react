import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  plugins: [react()],
  server: {
    host: 'localhost', // Specify the desired host
    port: 3000,        // Specify the desired port
    https: false,      // Disable HTTPS
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/store'),
      '@components': path.resolve(__dirname, './src/components'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
});

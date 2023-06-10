import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://master--gleeful-figolla-2abbff.netlify.app/',
  plugins: [react()],
});

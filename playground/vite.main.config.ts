import swc from 'unplugin-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    swc.vite(),
  ],
});

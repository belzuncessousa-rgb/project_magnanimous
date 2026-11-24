import { defineConfig } from 'vite';

// base './' so the build works under https://<user>.github.io/<repo>/ and inside Electron/Tauri later.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});

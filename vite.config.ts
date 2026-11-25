/// <reference types="vitest" />
import { defineConfig, configDefaults } from 'vitest/config';

// base './' so the build works under https://<user>.github.io/<repo>/ and inside Electron/Tauri later.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
  server: { watch: { ignored: ['**/.claude/**'] } },
  test: { exclude: [...configDefaults.exclude, '**/.claude/**'] },
});

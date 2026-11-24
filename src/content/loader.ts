// Content discovery (Vite). Everything under /content is bundled at build time.
// Real files win over /content/_demo per category (see buildContent).
import { buildContent, type ContentBundle, type RawFile } from './schema';

const md = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const json = import.meta.glob('/content/**/*.json', { import: 'default', eager: true }) as Record<string, unknown>;

export function rawContentFiles(): RawFile[] {
  return [
    ...Object.entries(md).map(([path, data]) => ({ path, data })),
    ...Object.entries(json).map(([path, data]) => ({ path, data })),
  ];
}

let cached: ContentBundle | undefined;
export function loadContent(): ContentBundle {
  cached ??= buildContent(rawContentFiles());
  return cached;
}

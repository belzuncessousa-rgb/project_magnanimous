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

/**
 * DEV ONLY: `?corpus=ch1` loads the chapter-1 integration corpus from tests/fixtures/ch1 instead of /content.
 * Dead-code-eliminated from production builds.
 */
export async function loadDevCorpus(): Promise<ContentBundle | null> {
  if (!import.meta.env.DEV) return null;
  if (new URLSearchParams(location.search).get('corpus') !== 'ch1') return null;
  const mdL = import.meta.glob('/tests/fixtures/ch1/content/**/*.md', { query: '?raw', import: 'default' });
  const jsL = import.meta.glob('/tests/fixtures/ch1/content/**/*.json', { import: 'default' });
  const files: RawFile[] = [];
  for (const [p, f] of [...Object.entries(mdL), ...Object.entries(jsL)]) {
    files.push({ path: p.replace('/tests/fixtures/ch1', ''), data: await f() });
  }
  return buildContent(files);
}

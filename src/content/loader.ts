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
 * DEV ONLY: `?corpus=main` loads the chapter-1 integration corpus from tests/fixtures/main instead of /content.
 * Dead-code-eliminated from production builds.
 */
export async function loadDevCorpus(): Promise<ContentBundle | null> {
  if (!import.meta.env.DEV) return null;
  const which = new URLSearchParams(location.search).get('corpus');
  // ?corpus=demo: only content/_demo (exercises budget, votes, readables, highlights)
  if (which === 'demo') return buildContent(rawContentFiles().filter((f) => f.path.includes('/content/_demo/')));
  if (which !== 'main') return null;
  const mdL = import.meta.glob('/tests/fixtures/main/content/**/*.md', { query: '?raw', import: 'default' });
  const jsL = import.meta.glob('/tests/fixtures/main/content/**/*.json', { import: 'default' });
  const files: RawFile[] = [];
  for (const [p, f] of [...Object.entries(mdL), ...Object.entries(jsL)]) {
    files.push({ path: p.replace('/tests/fixtures/main', ''), data: await f() });
  }
  return buildContent(files);
}

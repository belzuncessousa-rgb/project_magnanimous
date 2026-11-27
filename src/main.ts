import './styles/index.css';
import { loadContent, loadDevCorpus } from './content/loader';
import { App } from './ui/app';
import type { Geometry } from './ui/map';

async function boot() {
  const root = document.getElementById('app')!;
  let geo: Geometry;
  try {
    const res = await fetch('map/regions.json');
    geo = (await res.json()) as Geometry;
  } catch (e) {
    root.textContent = 'Could not load map data.';
    throw e;
  }
  const app = new App(root, (await loadDevCorpus()) ?? loadContent(), geo);
  app.showTitle();
  (window as unknown as { __app?: App }).__app = app;
}

void boot();

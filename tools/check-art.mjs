// Art contract checker (C-04). Verifies that every room plate and portrait the game can ask for exists and is in a
// usable format. Errors fail `npm test` (tests/art.test.ts); warnings are printed but allowed.
//
//   node tools/check-art.mjs            human-readable report, exit 1 on errors
//   import { checkArt } from './tools/check-art.mjs'   → { errors, warnings, stats }
//
// Contract (docs/ART-UI-CANON.md, "Asset contract"):
//   public/backgrounds/<id>.webp                         every scene `background:` and every room in dialogue-stage.ts
//   public/portraits/<id>-<seated|standing>.png (RGBA)   every scene `portraits:` id and every character `portrait`
//   public/map/*, public/identity/*                      files the UI references directly
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '../..');
const MB = 1024 * 1024;
const PORTRAIT_WARN_BYTES = 2.5 * MB;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));

function pngInfo(file) {
  const b = readFileSync(file);
  const ok = b.length >= 33 && b.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (!ok) return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20), colorType: b[25], hasTRNS: b.includes(Buffer.from('tRNS')) };
}
const isWebp = (file) => { const b = readFileSync(file); return b.length >= 12 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP'; };

function frontMatter(text) {
  const m = text.match(/^---\s*\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}

export function checkArt(root = ROOT) {
  const errors = [];
  const warnings = [];
  const p = (...xs) => join(root, ...xs);

  // ---- what the game asks for
  const rooms = new Map(); // background id -> pose
  const stage = readFileSync(p('src/ui/dialogue-stage.ts'), 'utf8');
  for (const m of stage.matchAll(/'([a-z0-9-]+)':\s*\{\s*label:[^}]*pose:\s*'(seated|standing)'/g)) rooms.set(m[1], m[2]);
  for (const m of stage.matchAll(/:\s*'([a-z0-9-]+)',?\s*$/gm)) if (!rooms.has(m[1]) && existsSync(p('public/backgrounds', `${m[1]}.webp`))) rooms.set(m[1], 'seated');

  const sceneBackgrounds = new Map(); // id -> [scene files]
  const scenePortraits = new Map(); // portrait id -> Set(pose wanted)
  const sceneDir = existsSync(p('content/scenes')) ? p('content/scenes') : null;
  for (const file of sceneDir ? walk(sceneDir).filter((f) => f.endsWith('.md')) : []) {
    const fm = frontMatter(readFileSync(file, 'utf8'));
    const bg = fm.match(/^background:\s*([a-z0-9-]+)/m)?.[1];
    if (bg) sceneBackgrounds.set(bg, [...(sceneBackgrounds.get(bg) ?? []), relative(root, file)]);
    const ids = fm.match(/^portraits:\s*\[(.*)\]/m)?.[1].split(',').map((x) => x.trim()).filter(Boolean) ?? [];
    for (const id of ids) {
      if (!scenePortraits.has(id)) scenePortraits.set(id, new Set());
      scenePortraits.get(id).add(rooms.get(bg ?? '') ?? 'standing');
    }
  }

  // ---- backgrounds
  const allBackgrounds = new Set([...rooms.keys(), ...sceneBackgrounds.keys()]);
  for (const id of [...allBackgrounds].sort()) {
    const file = p('public/backgrounds', `${id}.webp`);
    const users = sceneBackgrounds.get(id);
    if (!existsSync(file)) {
      (users ? errors : warnings).push(`background ${id}.webp missing${users ? ` (used by ${users.join(', ')})` : ' (room preset only)'}`);
    } else if (!isWebp(file)) errors.push(`background ${id}.webp is not a WebP file`);
  }

  // ---- portraits
  let characters = [];
  try {
    const raw = JSON.parse(readFileSync(p('content/characters.json'), 'utf8'));
    characters = Array.isArray(raw) ? raw : Object.values(raw.characters ?? raw);
  } catch { /* the content loader reports this */ }
  const wanted = new Map(scenePortraits);
  for (const c of characters) {
    const id = c.portrait ?? c.id;
    if (id && !wanted.has(id)) wanted.set(id, new Set());
  }
  let portraitBytes = 0;
  for (const [id, poses] of [...wanted].sort((a, b) => a[0].localeCompare(b[0]))) {
    const variants = ['seated', 'standing'].map((pose) => [pose, p('public/portraits', `${id}-${pose}.png`)]).filter(([, f]) => existsSync(f));
    const legacy = p('public/portraits', `${id}.png`);
    if (!variants.length && !existsSync(legacy)) {
      (scenePortraits.has(id) ? errors : warnings).push(`portrait ${id}: no ${id}-seated.png, ${id}-standing.png or ${id}.png${scenePortraits.has(id) ? ' (on stage in a scene)' : ' (Codex shows initials)'}`);
      continue;
    }
    for (const pose of poses) {
      if (!existsSync(p('public/portraits', `${id}-${pose}.png`))) warnings.push(`portrait ${id}: scene room wants ${pose}, falls back to ${variants[0]?.[0] ?? 'legacy'}`);
    }
    for (const [pose, f] of variants) {
      const info = pngInfo(f);
      const name = `${id}-${pose}.png`;
      if (!info) { errors.push(`portrait ${name} is not a PNG`); continue; }
      if (![4, 6].includes(info.colorType) && !info.hasTRNS) errors.push(`portrait ${name} has no alpha channel (colour type ${info.colorType}); masters must be transparent`);
      const size = statSync(f).size;
      portraitBytes += size;
      if (size > PORTRAIT_WARN_BYTES) warnings.push(`portrait ${name} is ${(size / MB).toFixed(1)} MB (> ${PORTRAIT_WARN_BYTES / MB} MB)`);
    }
  }

  // ---- web derivatives (tools/make-portrait-webp.py); missing or stale ones fall back to the PNG master
  let manifest = {};
  try { manifest = JSON.parse(readFileSync(p('public/portraits/web/manifest.json'), 'utf8')); } catch { /* none yet */ }
  const stale = [];
  for (const f of readdirSync(p('public/portraits')).filter((n) => n.endsWith('.png'))) {
    const webp = p('public/portraits/web', f.replace(/\.png$/, '.webp'));
    const digest = createHash('sha1').update(readFileSync(p('public/portraits', f))).digest('hex');
    if (!existsSync(webp) || manifest[f] !== digest) stale.push(f);
  }
  if (stale.length) warnings.push(`${stale.length} portrait master(s) without an up-to-date web copy (run python3 tools/make-portrait-webp.py): ${stale.join(', ')}`);

  // ---- files the UI references directly
  const direct = ['public/map/regions.json', 'public/map/arvain-terrain-art.png', 'public/map/kunasai-terrain-art.png',
    'public/map/strategy-table-background.png', 'public/map/sea-tile.png',
    ...['kunasai-arms', 'kunasai-flag', 'kunasai-mark', 'presidential-standard'].map((n) => `public/identity/${n}.svg`)];
  const tokenSrc = readFileSync(p('src/ui/tokens.ts'), 'utf8').match(/TOKENS = \[([^\]]*)\]/)?.[1] ?? '';
  for (const t of tokenSrc.matchAll(/'([a-z-]+)'/g)) direct.push(`public/map/tokens/${t[1]}.png`);
  for (const t of tokenSrc.matchAll(/'([a-z-]+)'/g)) direct.push(`public/map/markers/${t[1]}.svg`);
  for (const k of ['reaction', 'note', 'report', 'incident']) direct.push(`public/map/pins/${k}.svg`);
  for (const k of ['news', 'social', 'codex', 'reports']) direct.push(`public/tablet/apps/${k}.svg`);
  for (const f of direct) {
    if (!existsSync(p(f))) { errors.push(`missing ${f}`); continue; }
    if (f.endsWith('.svg') && !/<svg[\s>]/.test(readFileSync(p(f), 'utf8').slice(0, 400))) errors.push(`${f} is not an SVG document`);
  }

  return {
    errors, warnings,
    stats: { backgrounds: allBackgrounds.size, portraits: wanted.size, portraitMB: +(portraitBytes / MB).toFixed(1), directFiles: direct.length },
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { errors, warnings, stats } = checkArt();
  console.log(`checked ${stats.backgrounds} backgrounds, ${stats.portraits} portrait ids (${stats.portraitMB} MB of masters), ${stats.directFiles} UI files`);
  for (const w of warnings) console.log('warn ', w);
  for (const e of errors) console.log('ERROR', e);
  console.log(errors.length ? `${errors.length} error(s)` : 'OK');
  if (errors.length) process.exitCode = 1;
}

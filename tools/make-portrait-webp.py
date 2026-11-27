"""Generate the lightweight portraits the game loads: public/portraits/web/<name>.webp from each PNG master.

Masters stay the source of truth (public/portraits/<id>-<pose>.png, RGBA PNG, delivered by the art lead).
Incremental: a derivative is rebuilt only when its master's content hash changed (web/manifest.json; git does not
keep file times). If a derivative is missing the game falls back
to the PNG master, so forgetting to run this never breaks the game; `npm test` prints a warning.
Usage: python3 tools/make-portrait-webp.py [--force]
"""
import hashlib
import json
import os
import sys
from PIL import Image

SRC = 'public/portraits'
OUT = os.path.join(SRC, 'web')
QUALITY = 85
force = '--force' in sys.argv
os.makedirs(OUT, exist_ok=True)
MANIFEST = os.path.join(OUT, 'manifest.json')
manifest = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
made = kept = 0
before = after = 0
for name in sorted(os.listdir(SRC)):
    if not name.endswith('.png'):
        continue
    src = os.path.join(SRC, name)
    dst = os.path.join(OUT, name[:-4] + '.webp')
    before += os.path.getsize(src)
    digest = hashlib.sha1(open(src, 'rb').read()).hexdigest()
    if not force and os.path.exists(dst) and manifest.get(name) == digest:
        kept += 1
        after += os.path.getsize(dst)
        continue
    im = Image.open(src)
    im = im.convert('RGBA')
    im.save(dst, 'WEBP', quality=QUALITY, method=6, exact=False)
    manifest[name] = digest
    after += os.path.getsize(dst)
    made += 1
manifest = {k: v for k, v in manifest.items() if os.path.exists(os.path.join(SRC, k))}
json.dump(manifest, open(MANIFEST, 'w'), indent=1, sort_keys=True)
print(f'{made} generated, {kept} up to date; masters {before / 2**20:.1f} MB -> web {after / 2**20:.1f} MB')

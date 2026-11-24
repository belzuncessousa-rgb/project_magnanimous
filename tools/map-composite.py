"""Post-process the AI-painted map so painted content matches the geometry exactly.

usage: python3 tools/map-composite.py <painted.png> <out.png>
- Repaints listed foreign countries as blank paper (texture borrowed from a known-blank country).
- Moves an arid painted texture from a donor polygon into Mognagna, keeping river pixels.
"""
import json, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out = sys.argv[1], sys.argv[2]
geo = json.load(open('public/map/regions.json'))
vb = geo['viewBox']
im = Image.open(src).convert('RGB'); W, H = im.size
A = np.asarray(im).astype(np.int16)
R = {r['id']: r for r in geo['regions']}

def px(poly):
    return [((x - vb['x']) / vb['w'] * W, (y - vb['y']) / vb['h'] * H) for x, y in poly]

def mask(rid, erode=4):
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).polygon(px(R[rid]['polygon']), fill=255)
    if erode: m = m.filter(ImageFilter.MinFilter(erode * 2 + 1))
    return np.asarray(m) > 127

def bbox(m):
    ys, xs = np.nonzero(m); return xs.min(), ys.min(), xs.max(), ys.max()

def texture_from(donor_id, target_mask):
    """Tile/mirror the donor's interior pixels to cover the target's bbox."""
    dm = mask(donor_id, erode=10); x0, y0, x1, y1 = bbox(dm)
    patch = A[y0:y1, x0:x1].copy(); pm = dm[y0:y1, x0:x1]
    # fill holes in the patch (outside donor polygon) with the patch mean to avoid sea bleeding
    mean = patch[pm].mean(axis=0); patch[~pm] = mean
    tx0, ty0, tx1, ty1 = bbox(target_mask); th, tw = ty1 - ty0 + 1, tx1 - tx0 + 1
    ph, pw = patch.shape[:2]
    reps = (th // ph + 2, tw // pw + 2)
    tile = np.block([[patch if (i + j) % 2 == 0 else patch[:, ::-1] for j in range(reps[1])] for i in range(reps[0])]) if False else None
    rows = []
    for i in range(reps[0]):
        row = [patch[::(-1 if i % 2 else 1), ::(-1 if j % 2 else 1)] for j in range(reps[1])]
        rows.append(np.concatenate(row, axis=1))
    tile = np.concatenate(rows, axis=0)[:th, :tw]
    full = A.copy(); full[ty0:ty1 + 1, tx0:tx1 + 1] = tile
    return full

def soft(m, radius=3):
    f = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius))
    return (np.asarray(f).astype(np.float32) / 255)[..., None]

out_a = A.astype(np.float32)
# 1) Foreign countries that were painted by mistake -> blank paper from Tarev
for rid in ['vassel', 'orvane']:
    m = mask(rid, erode=4)
    tex = texture_from('tarev', m)
    a = soft(m, 2) * m[..., None]
    out_a = out_a * (1 - a) + tex * a

# 2) Mognagna <- arid texture painted (by mistake) inside Vassel; keep rivers (bluish pixels)
mm = mask('mognagna', erode=4)
vm = mask('vassel', erode=12)
# largest axis-aligned square fully inside the donor's painted interior
ys, xs = np.nonzero(vm); cy, cx = int(ys.mean()), int(xs.mean()); half = 20
while vm[cy - half - 8:cy + half + 8, cx - half - 8:cx + half + 8].all(): half += 8
patch = A[cy - half:cy + half, cx - half:cx + half]
mx0, my0, mx1, my1 = bbox(mm); h, w = my1 - my0 + 1, mx1 - mx0 + 1
ph, pw = patch.shape[:2]
rows = []
for i in range(h // ph + 2):
    rows.append(np.concatenate([patch[::(-1 if i % 2 else 1), ::(-1 if j % 2 else 1)] for j in range(w // pw + 2)], axis=1))
tile = np.concatenate(rows, axis=0)[:h, :w]
arid = A.copy(); arid[my0:my1 + 1, mx0:mx1 + 1] = tile
orig = A
river = (orig[..., 2] > orig[..., 0] + 8) & (orig[..., 2] > 110)
river = np.asarray(Image.fromarray((river * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0
m2 = mm & ~river
a = soft(m2, 2) * m2[..., None]
out_a = out_a * (1 - a) + arid.astype(np.float32) * a

Image.fromarray(np.clip(out_a, 0, 255).astype(np.uint8)).save(out)
print('saved', out, W, H)

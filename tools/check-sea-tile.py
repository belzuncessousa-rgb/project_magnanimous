"""Check that public/map/sea-tile.jpg tiles seamlessly and matches the atlas painting's open water.

Usage: python3 tools/check-sea-tile.py [tile path]
Pass criteria (rule of thumb): each edge-to-opposite-edge difference within ~2x the difference between two
neighbouring interior columns/rows, and the mean colour within ~3 levels per channel of the atlas sea sample.
"""
import sys
from PIL import Image, ImageStat

path = sys.argv[1] if len(sys.argv) > 1 else 'public/map/sea-tile.jpg'
t = Image.open(path).convert('RGB')
w, h = t.size
lum = lambda p: sum(p) / 3
col = lambda x: [lum(t.getpixel((x, y))) for y in range(0, h, 2)]
row = lambda y: [lum(t.getpixel((x, y))) for x in range(0, w, 2)]
diff = lambda a, b: sum(abs(i - j) for i, j in zip(a, b)) / len(a)

lr, lr_ref = diff(col(0), col(w - 1)), diff(col(w // 2), col(w // 2 + 1))
tb, tb_ref = diff(row(0), row(h - 1)), diff(row(h // 2), row(h // 2 + 1))
tile_mean = ImageStat.Stat(t).mean
atlas = Image.open('public/map/arvain-terrain-art.png').convert('RGB').crop((738, 1215, 991, 1466))
atlas_mean = ImageStat.Stat(atlas).mean
print(f'{path}: {w}x{h}')
print(f'left/right seam {lr:.1f}  (interior neighbours {lr_ref:.1f})  ' + ('OK' if lr <= 2 * lr_ref + 1 else 'SEAM VISIBLE'))
print(f'top/bottom seam {tb:.1f}  (interior neighbours {tb_ref:.1f})  ' + ('OK' if tb <= 2 * tb_ref + 1 else 'SEAM VISIBLE'))
delta = [round(a - b, 1) for a, b in zip(tile_mean, atlas_mean)]
print(f'mean RGB {[round(v, 1) for v in tile_mean]} vs atlas sea {[round(v, 1) for v in atlas_mean]}  delta {delta}  '
      + ('OK' if max(abs(d) for d in delta) <= 3 else 'COLOUR MISMATCH (atlas edge will show)'))

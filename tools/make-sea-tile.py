"""Derive a seamless sea tile from open water in the approved Arvain atlas painting.

The crop is mirrored 2x2 so every edge matches. Interim asset: an art-team painted seamless tile can replace
public/map/sea-tile.jpg at the same path (see docs/collab/BOARD.md G-08).
Usage: python3 tools/make-sea-tile.py
"""
from PIL import Image, ImageOps

SRC = 'public/map/arvain-terrain-art.png'
OUT = 'public/map/sea-tile.jpg'
BOX = (738, 1215, 991, 1466)  # open water south-east of the isthmus, in source pixels

crop = Image.open(SRC).convert('RGB').crop(BOX)
w, h = crop.size
tile = Image.new('RGB', (w * 2, h * 2))
tile.paste(crop, (0, 0))
tile.paste(ImageOps.mirror(crop), (w, 0))
tile.paste(ImageOps.flip(crop), (0, h))
tile.paste(ImageOps.flip(ImageOps.mirror(crop)), (w, h))
tile.save(OUT, quality=88)
print(OUT, tile.size)

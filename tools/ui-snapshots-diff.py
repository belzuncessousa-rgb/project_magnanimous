import sys, os
from PIL import Image, ImageChops
a, b = sys.argv[1], sys.argv[2]
bad = 0
for f in sorted(os.listdir(a)):
    if f.startswith('_'):
        continue
    x = Image.open(os.path.join(a, f)).convert('RGB')
    y = Image.open(os.path.join(b, f)).convert('RGB')
    if x.size != y.size:
        print('SIZE ', f); bad += 1; continue
    d = ImageChops.difference(x, y).convert('L').point(lambda v: 255 if v > 8 else 0)
    bb = d.getbbox()
    n = sum(d.histogram()[255:]) if bb else 0
    print(('SAME ' if n == 0 else 'DIFF ') + f, bb or '', n or '')
    if n:
        bad += 1
        d.save(os.path.join(b, '_diff_' + f))
print('changed:', bad)

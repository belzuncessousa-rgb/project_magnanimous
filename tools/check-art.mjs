import { existsSync, readFileSync } from 'node:fs';
const expected = ['public/backgrounds/president-office.webp', ...['livia','mertens'].flatMap(id => ['seated','standing'].map(pose => 'public/portraits/'+id+'-'+pose+'.png'))];
let missing = 0;
for (const file of expected) {
  if (!existsSync(file)) { console.log('MISSING', file); missing++; continue; }
  const b = readFileSync(file);
  if (file.endsWith('.png')) {
    const png = b.length >= 33 && b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    const type = b[25];
    if (!png || ![4,6].includes(type)) { console.log('CHECK PNG ALPHA FORMAT', file); missing++; continue; }
    console.log('OK', file, b.readUInt32BE(16)+'x'+b.readUInt32BE(20), '(alpha-capable PNG)');
  } else {
    const webp = b.length >= 12 && b.toString('ascii',0,4)==='RIFF' && b.toString('ascii',8,12)==='WEBP';
    if (!webp) { console.log('INVALID WEBP',file); missing++; continue; }
    console.log('OK',file);
  }
}
if (missing) process.exitCode = 1;

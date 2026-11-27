import { describe, expect, it } from 'vitest';
// @ts-expect-error plain ESM tool without type declarations
import { checkArt } from '../tools/check-art.mjs';

describe('art contract (tools/check-art.mjs)', () => {
  it('every background and portrait the game asks for exists, in the right format, with alpha', () => {
    const { errors } = checkArt() as { errors: string[] };
    expect(errors).toEqual([]);
  });
});

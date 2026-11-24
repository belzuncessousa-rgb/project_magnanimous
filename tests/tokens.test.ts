import { describe, expect, it } from 'vitest';
import { parseAmounts, parseBracket, parseTokenSpan } from '../src/scene/tokens';

describe('tokens', () => {
  it('compass shifts', () => {
    expect(parseBracket('+2 ECON')).toEqual({ kind: 'effect', effect: { type: 'compass', axis: 'ECON', delta: 2 } });
    expect(parseBracket('-1 struct')).toEqual({ kind: 'effect', effect: { type: 'compass', axis: 'STRUCT', delta: -1 } });
    expect(parseBracket('0 FORCE')).toEqual({ kind: 'effect', effect: { type: 'compass', axis: 'FORCE', delta: 0 } });
  });

  it('regional indices with @ lists, all/national and aliases', () => {
    expect(parseBracket('approval +5 @ ibicui')).toEqual({ kind: 'effect', effect: { type: 'region', index: 'approval', delta: 5, regions: ['ibicui'] } });
    expect(parseBracket('approval -5 @ Ibicuí, Mognagna, Ibira')).toMatchObject({ effect: { regions: ['Ibicuí', 'Mognagna', 'Ibira'], delta: -5 } });
    expect(parseBracket('CoL +1 @ all')).toMatchObject({ effect: { index: 'col', regions: ['all'] } });
    expect(parseBracket('stability +3 @ national')).toMatchObject({ effect: { index: 'stability', delta: 3 } });
    expect(parseBracket('infrastructure +4 @ ibira')).toMatchObject({ effect: { index: 'infrastructure' } });
    expect(parseBracket('approval_rv +2 @ tapira')).toMatchObject({ effect: { index: 'approval', rv: true } });
    expect(parseBracket('stability -2')).toMatchObject({ effect: { regions: 'all' } });
  });

  it('actor, faction and country stats', () => {
    expect(parseBracket('Mertens opinion +5')).toEqual({ kind: 'effect', effect: { type: 'actor', actor: 'Mertens', stat: 'loyalty', delta: 5 } });
    expect(parseBracket('mertens loyalty +5')).toMatchObject({ effect: { stat: 'loyalty' } });
    expect(parseBracket('mertens suspicion +10')).toMatchObject({ effect: { stat: 'suspicion', delta: 10 } });
    expect(parseBracket('cartels capacity -5')).toMatchObject({ effect: { actor: 'cartels', stat: 'capacity', delta: -5 } });
    expect(parseBracket('OPP capacity -2')).toMatchObject({ effect: { actor: 'OPP' } });
    expect(parseBracket('Pelan Avros opinion -1')).toMatchObject({ effect: { actor: 'Pelan Avros' } });
    expect(parseBracket('federation relation +1')).toEqual({ kind: 'effect', effect: { type: 'country', country: 'federation', stat: 'relation', delta: 1 } });
    expect(parseBracket('zharan trade +3')).toMatchObject({ effect: { type: 'country', stat: 'trade' } });
  });

  it('flags', () => {
    expect(parseBracket('flag: promised_CoL = true')).toEqual({ kind: 'effect', effect: { type: 'flag', name: 'promised_CoL', op: '=', value: true } });
    expect(parseBracket('flag: n = 3')).toMatchObject({ effect: { value: 3 } });
    expect(parseBracket('flag: n += 1')).toMatchObject({ effect: { op: '+=', value: 1 } });
    expect(parseBracket('flag: mood = angry')).toMatchObject({ effect: { value: 'angry' } });
    expect(parseBracket('flag: bare')).toMatchObject({ effect: { value: true } });
  });

  it('costs, gains, requirements with aliases', () => {
    expect(parseBracket('cost: 2 PT')).toEqual({ kind: 'cost', amounts: { PT: 2 } });
    expect(parseBracket('cost: 1 IPI, 2 FC')).toEqual({ kind: 'cost', amounts: { IPI: 1, FC: 2 } });
    expect(parseBracket('cost: 2 capital')).toEqual({ kind: 'cost', amounts: { FC: 2 } });
    expect(parseBracket('gain: 1 IPI')).toEqual({ kind: 'gain', amounts: { IPI: 1 } });
    expect(parseBracket('req: 2 capital')).toMatchObject({ kind: 'req', amounts: { FC: 2 } });
    expect(parseBracket('req flag: fontes_fiscal_pact')).toMatchObject({ kind: 'req', raw: 'fontes_fiscal_pact' });
    expect(parseAmounts('PT 2')).toEqual({ PT: 2 });
    expect(parseAmounts('2 bananas')).toBeUndefined();
  });

  it('conditions, once, news, popups, tax', () => {
    expect(parseBracket('show if: promised_GDP & !named_cartels')).toMatchObject({ kind: 'show' });
    expect(parseBracket('lock if: !met_dara')).toMatchObject({ kind: 'lock' });
    expect(parseBracket('if: named_cartels')).toMatchObject({ kind: 'if' });
    expect(parseBracket('once')).toEqual({ kind: 'once' });
    expect(parseBracket('news: ledger debt-reveal')).toEqual({ kind: 'effect', effect: { type: 'news', paper: 'ledger', id: 'debt-reveal' } });
    expect(parseBracket('pop: river-levels')).toEqual({ kind: 'effect', effect: { type: 'popup', id: 'river-levels' } });
    expect(parseBracket('tax domestic +5%')).toMatchObject({ effect: { type: 'tax', which: 'domestic', delta: 0.05 } });
  });

  it('unknown tokens are reported, not thrown', () => {
    expect(parseBracket('wibble wobble')).toEqual({ kind: 'unknown', raw: 'wibble wobble' });
    expect(parseBracket('show if: (broken')).toMatchObject({ kind: 'unknown' });
  });

  it('spans with several groups and arrows', () => {
    const t = parseTokenSpan('[+1 WELF] [once] → balcony');
    expect(t.map((x) => x.kind)).toEqual(['effect', 'once', 'goto']);
    expect(parseTokenSpan('→ scene:p1-cabinet')).toEqual([{ kind: 'goto', target: 'scene:p1-cabinet' }]);
  });
});

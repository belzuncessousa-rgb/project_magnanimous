// Scene parser for docs/SCENE-FORMAT.md. Also accepts pages pasted from Notion (HTML-ish markup:
// <b>, <i>, <code>, `- ↳` sub-bullets, "## Title — Subtitle" headings, fuzzy `→ ECON topic` targets).
import type { CondEffect, ResourceAmounts } from '../core/effects';
import { parseExpr, type Expr } from '../core/expr';
import { slugify } from '../core/ids';
import { splitFrontMatter, type FMValue } from './frontmatter';
import { extractCodeSpans, parseTokenSpan, type Token } from './tokens';
import type { Beat, Choice, Prose, Scene, SceneMeta, Step, Target } from './types';

const SKIP_BEAT = /^(open (design )?questions?|design(er)? notes?|notes|todo)\b/i;
const HUB_TITLE = /\bhub\b/i;
const HUB_EXIT = /\b(finish|end|leave|conclude|done|exit|back)\b/i;
const QUOTE_START = /^["“«'‘]/;

// ---------------------------------------------------------------------------------------------
// Notion → markdown normalisation

const ENTITIES: Record<string, string> = { '&gt;': '>', '&lt;': '<', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };

export function normalizeMarkup(src: string): string {
  let s = src.replace(/\r\n?/g, '\n');
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<\/?(b|strong)>/gi, '**');
  s = s.replace(/<\/?(i|em)>/gi, '*');
  s = s.replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`');
  s = s.replace(/<br\s*\/?>/gi, ' ');
  s = s.replace(/<p\s*\/?>|<\/p>/gi, '');
  s = s.replace(/<\/?[a-z][^>]*>/gi, '');
  s = s.replace(/\\&gt;/g, '>');
  s = s.replace(/&(gt|lt|amp|quot|#39|nbsp|apos);/g, (m) => ENTITIES[m] ?? m);
  // markdown escapes: \~ \_ \$ \* \[ ...
  s = s.replace(/\\([~_$*[\]#>|-])/g, '$1');
  // "**a** **b**" artefacts like "****" from adjacent tags
  s = s.replace(/\*{4}/g, '');
  return s;
}

// ---------------------------------------------------------------------------------------------

interface ParseOptions {
  /** used to derive the id when the file has no front-matter */
  filename?: string;
}

function str(v: FMValue | undefined): string | undefined {
  if (v === undefined || v === null) return undefined;
  if (Array.isArray(v)) return v.join(', ');
  return String(v);
}
function numv(v: FMValue | undefined): number | undefined {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v.trim())) return parseFloat(v);
  return undefined;
}

function stripOuterQuotes(t: string): string {
  const s = t.trim();
  const pairs: [string, string][] = [['"', '"'], ['“', '”'], ['«', '»']];
  for (const [a, b] of pairs) {
    if (s.startsWith(a) && s.endsWith(b) && s.length >= 2) {
      const inner = s.slice(a.length, s.length - b.length);
      // only strip when the quote is a single span (no inner closing quote)
      if (!inner.includes(b) && !inner.includes(a)) return inner.trim();
    }
  }
  return s;
}

/** `*text*` or `_text_` wrapping the whole paragraph → thought */
function asThought(t: string): string | undefined {
  const s = t.trim();
  const m = /^\*(?!\*)([\s\S]*[^*])\*$/.exec(s) ?? /^_([\s\S]+)_$/.exec(s);
  if (!m) return undefined;
  // reject "*a* and *b*" (two separate italic spans)
  if (/(^|[^*])\*([^*]|$)/.test(m[1]!)) return undefined;
  return m[1]!.trim();
}

function isTokenOnly(line: string): boolean {
  const { spans, text } = extractCodeSpans(line);
  if (spans.length === 0) return /^(→|->)\s*\S/.test(text);
  return text === '' || /^(→|->)\s*\S/.test(text);
}

class SceneBuilder {
  warnings: string[] = [];
  constructor(public sceneId: string) {}

  warn(msg: string) {
    this.warnings.push(`${this.sceneId}: ${msg}`);
  }

  /** Apply tokens to a prose block / choice-after block. */
  tokensToProse(tokens: Token[], prose: Prose) {
    let cond: Expr | undefined;
    for (const t of tokens) {
      if (t.kind === 'if') {
        if (prose.cond === undefined && prose.effects.length === 0) prose.cond = t.expr;
        else cond = t.expr;
      } else if (t.kind === 'effect') prose.effects.push(cond ? { effect: t.effect, cond } : { effect: t.effect });
      else if (t.kind === 'gain') prose.effects.push({ effect: { type: 'resource', amounts: t.amounts }, ...(cond ? { cond } : {}) });
      else if (t.kind === 'cost') {
        const neg: ResourceAmounts = {};
        for (const [k, v] of Object.entries(t.amounts)) neg[k as keyof ResourceAmounts] = -(v ?? 0);
        prose.effects.push({ effect: { type: 'resource', amounts: neg }, ...(cond ? { cond } : {}) });
      } else if (t.kind === 'unknown') this.warn(`unknown token [${t.raw}]`);
    }
  }

  /** Build a prose block from markdown text (paragraph or blockquote body). */
  makeProse(raw: string, quote: boolean): { prose?: Prose; goto?: string } {
    const { spans, text } = extractCodeSpans(raw);
    const tokens = spans.flatMap(parseTokenSpan);
    let body = text;
    let goto: string | undefined;
    const tg = tokens.find((t) => t.kind === 'goto');
    if (tg && tg.kind === 'goto') goto = tg.target;
    const plainGoto = /\s*(?:→|->)\s*([^\s].*)$/.exec(body);
    if (plainGoto && !quote) {
      goto = plainGoto[1]!.trim();
      body = body.slice(0, plainGoto.index).trim();
    }
    if (!body) {
      return { goto };
    }
    let prose: Prose;
    if (quote) {
      const m = /^\*\*([^*]+?):?\*\*:?\s*([\s\S]*)$/.exec(body);
      if (m && m[1]!.trim().length < 60) {
        prose = { role: 'speech', speaker: m[1]!.replace(/:$/, '').trim(), text: stripOuterQuotes(m[2]!), effects: [] };
      } else {
        prose = { role: 'speech', text: stripOuterQuotes(body), effects: [] };
      }
    } else {
      const th = asThought(body);
      prose = th !== undefined ? { role: 'thought', text: th, effects: [] } : { role: 'narration', text: body, effects: [] };
    }
    this.tokensToProse(tokens, prose);
    return { prose, goto };
  }

  parseChoiceLine(n: number, rest: string): Choice {
    const { spans, text } = extractCodeSpans(rest);
    const tokens = spans.flatMap(parseTokenSpan);
    let t = text;
    let gotoRaw: string | undefined;
    const pg = /(?:→|->)\s*(.+)$/.exec(t);
    if (pg) {
      gotoRaw = pg[1]!.trim();
      t = t.slice(0, pg.index).trim();
    }
    const bold = /\*\*([\s\S]+?)\*\*/.exec(t);
    let label = (bold ? bold[1]! : t).trim();
    label = label.replace(/^\*+|\*+$/g, '').trim();
    const choice: Choice = {
      n,
      label,
      spoken: QUOTE_START.test(label),
      effects: [],
      cost: {},
      req: [],
      once: false,
      after: [],
      gotoRaw,
    };
    let cond: Expr | undefined;
    for (const tok of tokens) {
      switch (tok.kind) {
        case 'effect':
          choice.effects.push(cond ? { effect: tok.effect, cond } : { effect: tok.effect });
          break;
        case 'gain':
          choice.effects.push({ effect: { type: 'resource', amounts: tok.amounts }, ...(cond ? { cond } : {}) });
          break;
        case 'cost':
          for (const [k, v] of Object.entries(tok.amounts)) {
            const key = k as keyof ResourceAmounts;
            choice.cost[key] = (choice.cost[key] ?? 0) + (v ?? 0);
          }
          break;
        case 'show':
          choice.show = tok.expr;
          break;
        case 'lock':
          choice.lock = tok.expr;
          break;
        case 'req':
          choice.req.push({ amounts: tok.amounts, expr: tok.expr, raw: tok.raw });
          break;
        case 'if':
          cond = tok.expr;
          break;
        case 'once':
          choice.once = true;
          break;
        case 'goto':
          choice.gotoRaw = tok.target;
          break;
        case 'unknown':
          this.warn(`unknown token [${tok.raw}] in choice "${label}"`);
          break;
      }
    }
    return choice;
  }

  parseBeatBody(lines: string[]): Step[] {
    const steps: Step[] = [];
    let para: string[] = [];
    let quote: string[] = [];
    let group: Choice[] | null = null;
    let choice: Choice | null = null;
    /** the after-block being continued by indented lines */
    let afterBuf: { lines: string[]; quote: boolean } | null = null;
    let skipping = false;

    const pushProse = (raw: string, isQuote: boolean) => {
      const { prose, goto } = this.makeProse(raw, isQuote);
      if (prose) steps.push({ type: 'prose', prose });
      if (goto) steps.push({ type: 'goto', target: { kind: 'unresolved', raw: goto }, raw: goto });
    };
    const flushPara = () => {
      if (para.length) pushProse(para.join(' '), false);
      para = [];
    };
    const flushQuote = () => {
      if (quote.length) pushProse(quote.join('\n'), true);
      quote = [];
    };
    const flushAfter = () => {
      if (afterBuf && choice) {
        const raw = afterBuf.lines.join(afterBuf.quote ? '\n' : ' ');
        const { prose } = this.makeProse(raw, afterBuf.quote);
        if (prose) choice.after.push(prose);
      }
      afterBuf = null;
    };
    const closeGroup = () => {
      flushAfter();
      if (group && group.length) steps.push({ type: 'choices', choices: group });
      group = null;
      choice = null;
    };
    const flushAll = () => {
      flushPara();
      flushQuote();
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const trimmed = line.trim();

      if (!trimmed) {
        skipping = false;
        flushAll();
        if (afterBuf) flushAfter();
        // keep the choice group open only if the next non-blank line continues it
        if (group) {
          let j = i + 1;
          while (j < lines.length && !lines[j]!.trim()) j++;
          const nx = lines[j];
          if (nx === undefined || !(/^\s{0,3}\d+[.)]\s+/.test(nx) || /^\s+\S/.test(nx) || /^\s*(?:[-*]\s+)?`?↳/.test(nx))) closeGroup();
        }
        continue;
      }
      if (skipping) continue;
      if (trimmed.startsWith('⚙️') || trimmed.startsWith('⚙')) {
        flushAll();
        skipping = true;
        continue;
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        flushAll();
        closeGroup();
        continue;
      }
      if (trimmed.startsWith('|') || /^!\[/.test(trimmed)) continue;
      // bold-only label like "**Menu:**" or "**Hub logic:**"
      if (/^\*\*[^*]+:\*\*$/.test(trimmed)) {
        flushAll();
        continue;
      }

      const item = /^\s{0,3}(\d+)[.)]\s+(.*)$/.exec(line);
      if (item) {
        flushAll();
        flushAfter();
        if (!group) group = [];
        choice = this.parseChoiceLine(group.length + 1, item[2]!);
        group.push(choice);
        continue;
      }

      // accompanying text under a choice
      const arrow = /^\s*(?:[-*]\s+)?`?↳`?\s*(.*)$/.exec(line);
      if (group && choice && arrow) {
        flushAfter();
        const content = arrow[1]!.trim();
        const isQ = /^(`[^`]*`\s*)*>/.test(content);
        const body = isQ ? content.replace(/^((?:`[^`]*`\s*)*)>\s?/, '$1') : content;
        afterBuf = { lines: [body], quote: isQ };
        continue;
      }
      if (group && choice && /^\s+\S/.test(line)) {
        // indented continuation
        let c = trimmed.replace(/^[-*]\s+/, '');
        const isQ = c.startsWith('>');
        if (isQ) c = c.replace(/^>\s?/, '');
        if (afterBuf && (isQ === afterBuf.quote || !isQ)) afterBuf.lines.push(c);
        else {
          flushAfter();
          afterBuf = { lines: [c], quote: isQ };
        }
        continue;
      }
      if (group) closeGroup();

      if (trimmed.startsWith('>')) {
        flushPara();
        const c = trimmed.replace(/^>\s?/, '');
        // a new **Name:** line inside a running quote starts a new speech block
        if (quote.length && /^\*\*[^*]+:?\*\*/.test(c)) flushQuote();
        if (c.trim() === '') {
          if (quote.length) quote.push('');
        } else quote.push(c);
        continue;
      }
      flushQuote();

      if (isTokenOnly(trimmed)) {
        flushPara();
        const { spans, text } = extractCodeSpans(trimmed);
        const toks = spans.flatMap(parseTokenSpan);
        const pg = /^(?:→|->)\s*(.+)$/.exec(text);
        if (pg) toks.push({ kind: 'goto', target: pg[1]!.trim() });
        const effects: CondEffect[] = [];
        let cond: Expr | undefined;
        for (const t of toks) {
          if (t.kind === 'if') cond = t.expr;
          else if (t.kind === 'effect') effects.push(cond ? { effect: t.effect, cond } : { effect: t.effect });
          else if (t.kind === 'gain') effects.push({ effect: { type: 'resource', amounts: t.amounts }, ...(cond ? { cond } : {}) });
          else if (t.kind === 'goto') {
            if (effects.length) steps.push({ type: 'effects', effects: effects.splice(0) });
            steps.push({ type: 'goto', target: { kind: 'unresolved', raw: t.target }, raw: t.target, ...(cond ? { cond } : {}) });
          } else if (t.kind === 'unknown') this.warn(`unknown token [${t.raw}]`);
        }
        if (effects.length) steps.push({ type: 'effects', effects });
        continue;
      }

      // unordered list items outside choices: each is its own paragraph
      if (/^[-*+]\s+/.test(trimmed)) {
        flushPara();
        para.push(trimmed.replace(/^[-*+]\s+/, ''));
        flushPara();
        continue;
      }
      para.push(trimmed);
    }
    flushAll();
    closeGroup();
    return steps;
  }
}

function resolveTarget(raw: string, beats: Beat[]): Target {
  const r = raw.trim().replace(/[.;,]+$/, '');
  // a beat literally named "end" wins over the keyword unless written END
  if (r !== 'END' && beats.some((b) => b.id === r)) return { kind: 'beat', beat: r };
  if (/^(end|end scene|map|return)$/i.test(r)) return { kind: 'end' };
  const sm = /^scene\s*:\s*(\S+)$/i.exec(r);
  if (sm) return { kind: 'scene', scene: sm[1]! };
  const exact = beats.find((b) => b.id === r);
  if (exact) return { kind: 'beat', beat: exact.id };
  const slug = slugify(r);
  const bySlug = beats.find((b) => b.id === slug || slugify(b.title) === slug);
  if (bySlug) return { kind: 'beat', beat: bySlug.id };
  // fuzzy: all words of the target appear in the beat id/title (Notion: "→ ECON topic" -> "▸ Topic: Work — ECON")
  const words = slug.split('-').filter(Boolean);
  if (words.length) {
    const fuzzy = beats.find((b) => {
      const bw = new Set([...b.id.split('-'), ...slugify(b.title).split('-')]);
      return words.every((w) => bw.has(w));
    });
    if (fuzzy) return { kind: 'beat', beat: fuzzy.id };
  }
  return { kind: 'unresolved', raw: r };
}

function parseHeading(h: string): { id: string; title: string } {
  const text = h.replace(/^#+\s*/, '').trim();
  const pipe = text.indexOf('|');
  if (pipe >= 0) {
    const left = text.slice(0, pipe).trim();
    const right = text.slice(pipe + 1).trim();
    return { id: /^[\w-]+$/.test(left) ? left : slugify(left), title: right || left };
  }
  const clean = text.replace(/^[▸►•·\s]+/, '').replace(/\*\*/g, '').trim();
  if (/^[a-z0-9][a-z0-9_-]*$/.test(clean)) return { id: clean, title: clean };
  return { id: slugify(clean), title: clean };
}

export function parseScene(src: string, opts: ParseOptions = {}): Scene {
  const { meta: fm, body, hasFrontMatter } = splitFrontMatter(src);
  const text = normalizeMarkup(body);
  const lines = text.split('\n');

  let h1: string | undefined;
  const sections: { heading?: string; lines: string[] }[] = [{ lines: [] }];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      if (h[1]!.length === 1) {
        h1 ??= h[2]!.trim();
        continue;
      }
      sections.push({ heading: h[2]!, lines: [] });
      continue;
    }
    sections[sections.length - 1]!.lines.push(line);
  }

  const fileId = opts.filename ? opts.filename.replace(/^.*\//, '').replace(/\.md$/i, '') : undefined;
  const id = str(fm.id) ?? fileId ?? (h1 ? slugify(h1) : 'scene');
  const b = new SceneBuilder(id);

  const beats: Beat[] = [];
  const seen = new Set<string>();
  for (let si = 0; si < sections.length; si++) {
    const sec = sections[si]!;
    if (!sec.heading) {
      // preamble: ignored for Notion pages (H1 + designer notes), otherwise an implicit first beat
      if (!hasFrontMatter && h1) continue;
      if (!sec.lines.some((l) => l.trim())) continue;
      const steps = b.parseBeatBody(sec.lines);
      if (steps.length) beats.push({ id: 'start', title: 'start', steps, hub: false });
      seen.add('start');
      continue;
    }
    const { id: bid0, title } = parseHeading(sec.heading);
    if (SKIP_BEAT.test(title)) continue;
    let bid = bid0 || `beat-${si}`;
    let k = 2;
    while (seen.has(bid)) bid = `${bid0}-${k++}`;
    seen.add(bid);
    const steps = b.parseBeatBody(sec.lines);
    const hasOnce = steps.some((s) => s.type === 'choices' && s.choices.some((c) => c.once));
    beats.push({ id: bid, title, steps, hub: HUB_TITLE.test(title) || HUB_TITLE.test(bid.replace(/-/g, ' ')) || hasOnce });
  }

  // resolve targets, implicit [once] in hubs
  for (const beat of beats) {
    for (const st of beat.steps) {
      if (st.type === 'goto') {
        st.target = resolveTarget(st.raw, beats);
        if (st.target.kind === 'unresolved') b.warn(`unresolved target '→ ${st.raw}' in beat ${beat.id}`);
      }
      if (st.type === 'choices') {
        for (const c of st.choices) {
          if (c.gotoRaw) {
            c.goto = resolveTarget(c.gotoRaw, beats);
            if (c.goto.kind === 'unresolved') b.warn(`unresolved target '→ ${c.gotoRaw}' in choice "${c.label}"`);
          }
          if (beat.hub && HUB_TITLE.test(beat.title) && !c.once && c.goto?.kind === 'beat') {
            const tb = beats.find((x) => x.id === (c.goto as { beat: string }).beat);
            const exit = HUB_EXIT.test(c.gotoRaw ?? '') || (tb && HUB_EXIT.test(tb.title));
            if (!exit) c.once = true;
          }
        }
      }
    }
  }

  let when: Expr | undefined;
  const whenRaw = str(fm.when);
  if (whenRaw) {
    try { when = parseExpr(whenRaw); } catch (e) { b.warn(`bad when expression: ${(e as Error).message}`); }
  }
  const portraits = Array.isArray(fm.portraits) ? fm.portraits.map(String) : fm.portraits ? String(fm.portraits).split(',').map((s) => s.trim()) : [];
  const known = new Set(['id', 'chapter', 'turn', 'title', 'kind', 'location', 'order', 'when', 'portraits', 'background', 'required']);
  const extra: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fm)) if (!known.has(k)) extra[k] = v;

  const meta: SceneMeta = {
    id,
    chapter: numv(fm.chapter),
    turn: numv(fm.turn),
    title: str(fm.title) ?? h1 ?? id,
    kind: (str(fm.kind) ?? 'conditional').toLowerCase(),
    location: str(fm.location),
    order: numv(fm.order),
    when,
    whenRaw,
    portraits,
    background: str(fm.background),
    required: typeof fm.required === 'boolean' ? fm.required : undefined,
    extra,
  };
  if (beats.length === 0) b.warn('scene has no beats');
  return { id, meta, beats, warnings: b.warnings, source: opts.filename };
}

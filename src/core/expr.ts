// Tiny expression language for `when`, `[show if: ...]`, crisis meters, etc.
// Supports: && & || | ! == != = >= <= > < + - * / ( ) numbers true false 'strings' and identifiers
// like flag.x, bare_flag, approval@ibicui, loyalty.mertens, compass.ECON, resource.PT, chapter, turn.

export type Expr =
  | { t: 'num'; v: number }
  | { t: 'bool'; v: boolean }
  | { t: 'str'; v: string }
  | { t: 'var'; name: string }
  | { t: 'not'; e: Expr }
  | { t: 'neg'; e: Expr }
  | { t: 'bin'; op: string; l: Expr; r: Expr };

export type Value = number | boolean | string;
export type Resolver = (name: string) => Value | undefined;

type Tok = { k: 'num' | 'id' | 'op' | 'str'; v: string };

const IDENT_START = /[A-Za-z_À-ɏ]/;
const IDENT_CHAR = /[\w.À-ɏ]/;

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i]!;
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] ?? ''))) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j]!)) j++;
      out.push({ k: 'num', v: src.slice(i, j) });
      i = j;
      continue;
    }
    if (c === "'" || c === '"') {
      const j = src.indexOf(c, i + 1);
      if (j < 0) throw new Error(`Unterminated string in expression: ${src}`);
      out.push({ k: 'str', v: src.slice(i + 1, j) });
      i = j + 1;
      continue;
    }
    if (IDENT_START.test(c)) {
      let j = i;
      while (j < src.length) {
        const ch = src[j]!;
        if (IDENT_CHAR.test(ch)) { j++; continue; }
        // hyphen inside identifiers (scene ids): only when followed by a letter
        if (ch === '-' && j > i && /[A-Za-z]/.test(src[j + 1] ?? '') && IDENT_CHAR.test(src[j - 1]!)) { j++; continue; }
        break;
      }
      let name = src.slice(i, j);
      // index@region (spaces around @ allowed)
      const m = /^\s*@\s*([A-Za-z_À-ɏ][\wÀ-ɏ-]*)/.exec(src.slice(j));
      if (m) {
        name = `${name}@${m[1]}`;
        j += m[0].length;
      }
      out.push({ k: 'id', v: name });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (['&&', '||', '==', '!=', '>=', '<='].includes(two)) {
      out.push({ k: 'op', v: two });
      i += 2;
      continue;
    }
    if ('&|!<>=+-*/()'.includes(c)) {
      out.push({ k: 'op', v: c });
      i++;
      continue;
    }
    throw new Error(`Unexpected character '${c}' in expression: ${src}`);
  }
  return out;
}

export function parseExpr(src: string): Expr {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (...ops: string[]) => {
    const t = toks[p];
    return !!t && t.k === 'op' && ops.includes(t.v);
  };
  const next = () => toks[p++]!;

  function or(): Expr {
    let l = and();
    while (isOp('||', '|')) { next(); l = { t: 'bin', op: '||', l, r: and() }; }
    return l;
  }
  function and(): Expr {
    let l = cmp();
    while (isOp('&&', '&')) { next(); l = { t: 'bin', op: '&&', l, r: cmp() }; }
    return l;
  }
  function cmp(): Expr {
    const l = add();
    if (isOp('==', '!=', '>=', '<=', '>', '<', '=')) {
      let op = next().v;
      if (op === '=') op = '==';
      return { t: 'bin', op, l, r: add() };
    }
    return l;
  }
  function add(): Expr {
    let l = mul();
    while (isOp('+', '-')) { const op = next().v; l = { t: 'bin', op, l, r: mul() }; }
    return l;
  }
  function mul(): Expr {
    let l = unary();
    while (isOp('*', '/')) { const op = next().v; l = { t: 'bin', op, l, r: unary() }; }
    return l;
  }
  function unary(): Expr {
    if (isOp('!')) { next(); return { t: 'not', e: unary() }; }
    if (isOp('-')) { next(); return { t: 'neg', e: unary() }; }
    return primary();
  }
  function primary(): Expr {
    const t = peek();
    if (!t) throw new Error(`Unexpected end of expression: ${src}`);
    if (t.k === 'op' && t.v === '(') {
      next();
      const e = or();
      if (!isOp(')')) throw new Error(`Missing ) in expression: ${src}`);
      next();
      return e;
    }
    next();
    if (t.k === 'num') return { t: 'num', v: parseFloat(t.v) };
    if (t.k === 'str') return { t: 'str', v: t.v };
    if (t.k === 'id') {
      const low = t.v.toLowerCase();
      if (low === 'true') return { t: 'bool', v: true };
      if (low === 'false') return { t: 'bool', v: false };
      return { t: 'var', name: t.v };
    }
    throw new Error(`Unexpected '${t.v}' in expression: ${src}`);
  }

  if (toks.length === 0) return { t: 'bool', v: true };
  const e = or();
  if (p < toks.length) throw new Error(`Unexpected '${toks[p]!.v}' in expression: ${src}`);
  return e;
}

export function toNum(v: Value | undefined): number {
  if (v === undefined) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : v.length > 0 ? 1 : 0;
}

export function truthy(v: Value | undefined): boolean {
  if (v === undefined) return false;
  if (typeof v === 'string') return v.length > 0 && v !== 'false' && v !== '0';
  return toNum(v) !== 0;
}

export function evalExpr(e: Expr, resolve: Resolver): Value {
  switch (e.t) {
    case 'num':
    case 'bool':
    case 'str':
      return e.v;
    case 'var':
      return resolve(e.name) ?? 0;
    case 'not':
      return !truthy(evalExpr(e.e, resolve));
    case 'neg':
      return -toNum(evalExpr(e.e, resolve));
    case 'bin': {
      if (e.op === '&&') return truthy(evalExpr(e.l, resolve)) && truthy(evalExpr(e.r, resolve));
      if (e.op === '||') return truthy(evalExpr(e.l, resolve)) || truthy(evalExpr(e.r, resolve));
      const l = evalExpr(e.l, resolve);
      const r = evalExpr(e.r, resolve);
      switch (e.op) {
        case '==':
          return typeof l === 'string' || typeof r === 'string' ? String(l) === String(r) : toNum(l) === toNum(r);
        case '!=':
          return typeof l === 'string' || typeof r === 'string' ? String(l) !== String(r) : toNum(l) !== toNum(r);
        case '>': return toNum(l) > toNum(r);
        case '<': return toNum(l) < toNum(r);
        case '>=': return toNum(l) >= toNum(r);
        case '<=': return toNum(l) <= toNum(r);
        case '+': return toNum(l) + toNum(r);
        case '-': return toNum(l) - toNum(r);
        case '*': return toNum(l) * toNum(r);
        case '/': { const d = toNum(r); return d === 0 ? 0 : toNum(l) / d; }
      }
      throw new Error(`Unknown operator ${e.op}`);
    }
  }
}

/** Collect variable names referenced by an expression (for validation). */
export function exprVars(e: Expr, out: string[] = []): string[] {
  if (e.t === 'var') out.push(e.name);
  else if (e.t === 'not' || e.t === 'neg') exprVars(e.e, out);
  else if (e.t === 'bin') { exprVars(e.l, out); exprVars(e.r, out); }
  return out;
}

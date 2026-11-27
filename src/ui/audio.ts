// Small audio manager (C-07, docs/audio/SOUND-PLAN.md). Silence is the default: nothing plays unless the file exists
// in public/audio/, the player has interacted with the page (browser autoplay rules) and volume/mute allow it.
// Missing files are remembered and never retried, so the game is silent until the art lead delivers sounds.

/** Interface sounds from the sound plan's P0/P1 inventory: public/audio/sfx/<id>.ogg */
export type Sfx = 'ui-confirm' | 'ui-back' | 'choice-select' | 'tablet-open' | 'document-open' | 'end-turn' | 'crisis-alert';
/** Music cues: public/audio/music/<id>.ogg */
export type MusicCue = 'title-theme';

export interface AudioLevels {
  master: number; // 0..1
  music: number; // 0..1
  sfx: number; // 0..1
  muted: boolean;
}

const base = () => (import.meta.env?.BASE_URL ?? '/');

export class AudioManager {
  private levels: AudioLevels = { master: 0.8, music: 0.6, sfx: 0.7, muted: false };
  private missing = new Set<string>();
  private cache = new Map<string, HTMLAudioElement>();
  private musicEl: HTMLAudioElement | null = null;
  private musicCue: MusicCue | null = null;
  private unlocked = false;

  constructor() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.unlocked = true;
      if (this.musicCue && !this.musicEl) this.music(this.musicCue);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
  }

  setLevels(levels: Partial<AudioLevels>) {
    this.levels = { ...this.levels, ...levels };
    if (this.musicEl) this.musicEl.volume = this.volume('music');
  }

  private volume(kind: 'music' | 'sfx') {
    const { master, muted } = this.levels;
    return muted ? 0 : Math.max(0, Math.min(1, master * this.levels[kind]));
  }

  private load(path: string): HTMLAudioElement | null {
    if (typeof Audio === 'undefined' || this.missing.has(path)) return null;
    let el = this.cache.get(path);
    if (!el) {
      el = new Audio(`${base()}audio/${path}`);
      el.preload = 'auto';
      el.addEventListener('error', () => { this.missing.add(path); this.cache.delete(path); });
      this.cache.set(path, el);
    }
    return el;
  }

  /** Play a short interface sound. Overlapping plays restart the sound rather than stacking. */
  play(id: Sfx) {
    const vol = this.volume('sfx');
    if (!this.unlocked || vol <= 0) return;
    const el = this.load(`sfx/${id}.ogg`);
    if (!el) return;
    el.volume = vol;
    el.currentTime = 0;
    void el.play().catch(() => { /* not loaded / not allowed: stay silent */ });
  }

  /** Start (or switch to) a music cue; `null` fades the current one out. Loops until changed. */
  music(cue: MusicCue | null) {
    if (cue === this.musicCue && this.musicEl && !this.musicEl.paused) return;
    this.musicCue = cue;
    const old = this.musicEl;
    this.musicEl = null;
    if (old) fadeOut(old);
    if (!cue || !this.unlocked) return;
    const el = this.load(`music/${cue}.ogg`);
    if (!el) return;
    el.loop = true;
    el.volume = this.volume('music');
    el.currentTime = 0;
    this.musicEl = el;
    void el.play().catch(() => { if (this.musicEl === el) this.musicEl = null; });
  }
}

function fadeOut(el: HTMLAudioElement, ms = 600) {
  const start = el.volume;
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / ms);
    el.volume = start * (1 - k);
    if (k < 1) requestAnimationFrame(step);
    else el.pause();
  };
  requestAnimationFrame(step);
}

/** Shared instance used by the UI. */
export const sound = new AudioManager();

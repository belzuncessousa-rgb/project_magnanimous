// Save/load via localStorage. Every access is wrapped: storage can be missing, full or blocked.
import type { GameState } from '../core/types';

export const SAVE_KEY = 'magnanimous.save.v1';
export const SETTINGS_KEY = 'magnanimous.settings.v1';

export interface SaveFile {
  savedAt: string;
  dateLabel: string;
  state: GameState;
}

export interface Settings {
  textSize: 'small' | 'medium' | 'large';
  transitions: boolean;
  mapView: 'terrain' | 'political';
}

export const DEFAULT_SETTINGS: Settings = { textSize: 'medium', transitions: true, mapView: 'political' };

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function storage(s?: StorageLike): StorageLike | undefined {
  if (s) return s;
  try {
    return typeof localStorage !== 'undefined' ? localStorage : undefined;
  } catch {
    return undefined;
  }
}

export function saveGame(state: GameState, s?: StorageLike): boolean {
  try {
    const file: SaveFile = { savedAt: new Date().toISOString(), dateLabel: state.dateLabel, state };
    storage(s)?.setItem(SAVE_KEY, JSON.stringify(file));
    return true;
  } catch {
    return false;
  }
}

export function loadGame(s?: StorageLike): SaveFile | null {
  try {
    const raw = storage(s)?.getItem(SAVE_KEY);
    if (!raw) return null;
    const f = JSON.parse(raw) as SaveFile;
    return f && f.state && typeof f.state.chapter === 'number' ? f : null;
  } catch {
    return null;
  }
}

export function deleteSave(s?: StorageLike): void {
  try {
    storage(s)?.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

export function loadSettings(s?: StorageLike): Settings {
  try {
    const raw = storage(s)?.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(v: Settings, s?: StorageLike): void {
  try {
    storage(s)?.setItem(SETTINGS_KEY, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

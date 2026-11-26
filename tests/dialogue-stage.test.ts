import { describe, it, expect } from 'vitest';
import { resolveDialogueStage } from '../src/ui/dialogue-stage';

describe('dialogue staging', () => {
  it('reserves cabinet seats and leaves overflow to the transcript', () => {
    const s = resolveDialogueStage({ id: 'p1-blue-room', background: 'blue-room', portraits: ['livia','mertens','fontes','lara'] }, 'lara');
    expect(s.cast).toEqual(['livia','mertens']);
    expect(s.pose).toBe('seated');
  });
  it('keeps the family call offstage', () => {
    expect(resolveDialogueStage({ id: 'p1-first-night', background: 'residence-night', portraits: ['amanda','celia'] }, 'lara').cast).toEqual(['amanda']);
  });
  it('preserves the map for tutorial and chooses standing for outdoor visits', () => {
    expect(resolveDialogueStage({ id: 'p1-tutorial', background: 'president-office', portraits: ['amanda'] }, 'lara').showEnvironment).toBe(false);
    expect(resolveDialogueStage({ id: 'jaguars', background: 'palace-courtyard', portraits: ['voss'] }, 'lara').pose).toBe('standing');
  });
  it('rejects unsafe background names and removes duplicate participants', () => {
    const s = resolveDialogueStage({ id: 'test', background: '../x', portraits: ['lara','voss','voss'] }, 'lara');
    expect(s.background).toBe('');
    expect(s.cast).toEqual(['voss']);
    expect(s.showEnvironment).toBe(false);
  });
});

import type { SceneMeta } from '../scene/types';

export type DialoguePose = 'seated' | 'standing';
interface RoomPreset { label: string; pose: DialoguePose; slots: 1 | 2 }
const rooms: Record<string, RoomPreset> = {
  'blue-room': { label: 'The Blue Room', pose: 'seated', slots: 2 },
  'blue-room-night': { label: 'The Blue Room', pose: 'seated', slots: 2 },
  'vp-office': { label: "Vice President's office", pose: 'seated', slots: 2 },
  'president-office': { label: 'Presidential office', pose: 'seated', slots: 2 },
  'residence-upstairs': { label: 'Presidential residence', pose: 'seated', slots: 1 },
  'residence-study': { label: 'Presidential residence', pose: 'seated', slots: 1 },
  'residence-night': { label: 'Presidential residence', pose: 'seated', slots: 1 },
  'palace-doors': { label: 'Presidential palace', pose: 'standing', slots: 1 },
  'palace-courtyard': { label: 'Palace courtyard', pose: 'standing', slots: 1 },
  'treasury-office': { label: 'Ministry of the Treasury', pose: 'seated', slots: 2 },
  'justice-office': { label: 'Ministry of Justice', pose: 'seated', slots: 2 },
  'congress-office': { label: 'Congressional office', pose: 'seated', slots: 1 },
  'congress-gallery': { label: 'Congressional gallery', pose: 'seated', slots: 2 },
  'planning-model-room': { label: 'Ministry of Planning', pose: 'standing', slots: 2 },
  'intelligence-office': { label: 'Ministry of Intelligence', pose: 'seated', slots: 1 },
  'tamarin-kitchen': { label: 'Vila Tamarin', pose: 'seated', slots: 2 },
  'hospital-corridor': { label: 'Hospital corridor', pose: 'standing', slots: 1 },
  'hospital-ward': { label: 'Hospital ward', pose: 'standing', slots: 1 },
  'university-hall': { label: 'Federal University', pose: 'standing', slots: 1 },
  'port-office': { label: 'Port administration', pose: 'seated', slots: 2 },
  'port-gates': { label: 'Port gates', pose: 'standing', slots: 2 },
  'residence-garden': { label: 'Garden', pose: 'standing', slots: 2 },
  'festival-square': { label: 'Festival square', pose: 'standing', slots: 2 },
  'sertao-town': { label: 'Mognagna interior', pose: 'standing', slots: 2 },
  'rail-yard': { label: 'Railway site', pose: 'standing', slots: 2 },
  'construction-site': { label: 'Construction site', pose: 'standing', slots: 2 },
  'forest-camp': { label: 'Forest camp', pose: 'standing', slots: 2 },
  'community-kitchen': { label: 'Community kitchen', pose: 'standing', slots: 2 },
  'factory-floor': { label: 'Factory floor', pose: 'standing', slots: 2 },
};
export interface DialogueStage {
  background: string;
  label: string;
  pose: DialoguePose;
  cast: string[];
  showEnvironment: boolean;
}

const residenceLocations: Record<string, string | undefined> = {
  arrival: 'residence-upstairs',
  'late-evening': 'residence-study',
  close: 'residence-upstairs',
  window: 'residence-study',
  dark: 'residence-upstairs',
};
const residenceSoloBeats = new Set([
  ...Object.keys(residenceLocations), 'after-departure', 'telephone', 'family-neighbourhood',
  'family-goodnight', 'after-call',
]);

/** Presentation only. Fixed casting order comes from scene metadata, never political state. */
export function resolveDialogueStage(meta: Pick<SceneMeta, 'id' | 'background' | 'portraits'>, playerId: string, beat?: string): DialogueStage {
  const firstNight = meta.id === 'p1-first-night' && meta.background === 'residence-night';
  const location = firstNight && beat ? residenceLocations[beat] ?? meta.background : meta.background;
  const background = location && /^[a-z0-9-]+$/.test(location) ? location : '';
  const room = rooms[background] ?? { label: '', pose: 'standing' as const, slots: 1 as const };
  let cast = [...new Set(meta.portraits.filter(id => id !== playerId))];
  // Family is on the phone in the revised first night, not in the residence.
  if (firstNight) cast = beat && residenceSoloBeats.has(beat) ? [] : cast.filter(id => id === 'amanda');
  return { background, label: room.label, pose: room.pose, cast: cast.slice(0, room.slots),
    showEnvironment: !!background && meta.id !== 'p1-tutorial' };
}

/** Pose directions from the production scenes, independent of dialogue and effects. */
export function dialoguePortraitPose(sceneId: string, beat: string | undefined, actorId: string | undefined, fallback: DialoguePose): DialoguePose {
  if (sceneId === 'p1-great-project' && beat === 'opening' && actorId === 'livia') return 'standing';
  if (sceneId === 'p2-sadrah' && beat === 'arrival' && actorId === 'sadrah') return 'standing';
  return fallback;
}

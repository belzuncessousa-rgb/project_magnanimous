// Portrait sources: the lightweight WebP derivative first (public/portraits/web/, made by
// tools/make-portrait-webp.py), then the PNG master, then any further fallbacks; the image is removed if none loads.

/** URL of the web derivative for a portrait file stem such as `livia-seated`. */
export const portraitWeb = (stem: string) => `portraits/web/${stem}.webp`;
/** URL of the PNG master for a portrait file stem. */
export const portraitMaster = (stem: string) => `portraits/${stem}.png`;

/**
 * Load the first source that works for `stems` (in order), preferring each stem's WebP over its PNG.
 * `onLoad` receives the index of the stem that loaded.
 */
export function loadPortrait(img: HTMLImageElement, stems: string[], onLoad?: (stemIndex: number) => void) {
  const sources = stems.flatMap((stem, i) => [[portraitWeb(stem), i], [portraitMaster(stem), i]] as const);
  let at = 0;
  img.addEventListener('error', () => {
    at++;
    if (at < sources.length) img.src = sources[at]![0];
    else img.remove();
  });
  img.addEventListener('load', () => onLoad?.(sources[at]![1]));
  img.src = sources[0]![0];
}

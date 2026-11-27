import { mkdirSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const screenshots = 'artifacts/ui-review';
mkdirSync(screenshots, { recursive: true });

async function startGame(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'New game' }).click();
  await expect(page.locator('.ui-layer')).toBeVisible();
  await expect(page.getByRole('button', { name: 'End turn' })).toBeVisible();
}

test('desktop map, desk, controls, zoom, and tablet work as one screen', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop-only visual check');
  await startGame(page);
  await expect(page.locator('.atlas-art')).toBeAttached();
  await expect(page.locator('.map')).toHaveClass(/view-political/);
  const artwork = await page.request.get('/map/arvain-terrain-art.png');
  const desk = await page.request.get('/map/strategy-table-background.png');
  expect(artwork.ok()).toBeTruthy();
  expect(desk.ok()).toBeTruthy();

  const tablet = page.getByRole('button', { name: 'Pick up the presidential tablet' });
  await expect(tablet).toBeVisible();
  const deviceBox = await tablet.boundingBox();
  expect(deviceBox?.width ?? 0).toBeGreaterThan(240);
  await page.screenshot({ path: `${screenshots}/desktop-continent.png` });

  await page.getByRole('button', { name: '☰ Menu' }).click();
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible();
  await page.screenshot({ path: `${screenshots}/desktop-menu.png` });
  await page.getByRole('dialog', { name: 'Menu' }).getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect(page.locator('.sidebar')).toHaveClass(/open/);
  await page.getByRole('button', { name: 'Actions' }).click();

  await page.getByRole('button', { name: 'Zoom out' }).click();
  await expect(page.locator('.map')).toHaveClass(/table-revealed/);
  await page.screenshot({ path: `${screenshots}/desktop-table.png` });
  await tablet.click();
  await expect(page.getByRole('dialog', { name: 'Kunasai tablet' })).toBeVisible();
  await page.screenshot({ path: `${screenshots}/desktop-tablet-home.png` });
  await page.getByRole('button', { name: 'News' }).click();
  await expect(page.getByRole('heading', { name: 'Today in the press' })).toBeVisible();
  await page.getByRole('button', { name: 'Social' }).click();
  await expect(page.getByRole('heading', { name: 'Latest posts' })).toBeVisible();
});

test('phone layout keeps controls visible and the tablet usable', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone-only visual check');
  await startGame(page);
  for (const name of ['Menu', 'Actions', 'End turn', 'Pick up the presidential tablet']) {
    await expect(page.getByRole('button', { name: new RegExp(name, 'i') })).toBeVisible();
  }
  const tablet = page.getByRole('button', { name: 'Pick up the presidential tablet' });
  const deviceBox = await tablet.boundingBox();
  expect(deviceBox?.width ?? 0).toBeGreaterThan(120);
  await page.screenshot({ path: `${screenshots}/phone-playing.png` });

  await tablet.click();
  await expect(page.getByRole('dialog', { name: 'Kunasai tablet' })).toBeVisible();
  await page.getByRole('button', { name: 'News' }).click();
  await expect(page.getByRole('heading', { name: 'Today in the press' })).toBeVisible();
  await page.screenshot({ path: `${screenshots}/phone-tablet-news.png` });
  await expect(page.locator('.newspaper .np-screen')).toBeInViewport();
});


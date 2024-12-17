import { test, expect } from '@playwright/test';

describe('@devcrate/data-sources ', () => {
  test('should work', async ({ page }) => {
    await page.goto('/');
  })
});

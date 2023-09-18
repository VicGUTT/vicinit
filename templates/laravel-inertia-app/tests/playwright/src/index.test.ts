import { test, expect } from '@playwright/test';

test.describe('index', () => {
    test('it works', async ({ page }) => {
        await page.goto('http://localhost:8000');

        await expect(page).toHaveTitle(/Welcome/);
    });
});

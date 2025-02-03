import { loadEnv } from 'vite';
import { test, expect } from '@playwright/test';

const env = loadEnv('all', process.cwd());

test.describe('index', () => {
    test('it works', async ({ page }) => {
        await page.goto(env.VITE_APP_URL);

        await expect(page).toHaveTitle(new RegExp(env.VITE_APP_NAME, 'g'));
    });
});

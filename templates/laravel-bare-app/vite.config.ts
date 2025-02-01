/// <reference types="vitest" />

import path from 'node:path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import watchAndRun from '@kitql/vite-plugin-watch-and-run';

const year = new Date().getFullYear();

export default defineConfig({
    build: {
        /**
         * @see https://vitejs.dev/config/#build-target
         */
        target: `es${year - 2}`,
    },
    resolve: {
        alias: {
            '~': path.resolve('.'),
            '@': path.resolve('./resources/ts'),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/app.ts'],
            refresh: true,
        }),
        tailwindcss(),
        /**
         * @see https://www.kitql.dev/docs/setup/03_vite-plugin-watch-and-run
         */
        watchAndRun([
            {
                name: 'ide-helper:models -W', //  -M
                run: 'php artisan ide-helper:models -W', //  -M
                watch: path.resolve('app/Models/**/*.php').replace(/\\/g, '/'),
            },
        ]),
    ],

    /**
     * @see https://vitest.dev/config/#configuration
     */
    test: {
        environment: 'node',
        include: ['./resources/tests/vitest/**/*.test.ts'],
        /**
         * @see https://github.com/vitest-dev/vitest/blob/95b1ba4c17df1677136b39762c19d859db3f4cb2/packages/vitest/src/types/coverage.ts
         */
        coverage: {
            reportsDirectory: './resources/tests/vitest/.coverage',
            // include: ['src/utils/**/*.{ts,js}'],
            // Threshold
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
});

/// <reference types="vitest" />

import { type ExecException, exec } from 'node:child_process';
import { type Plugin, defineConfig } from 'vite';
import path from 'node:path';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
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
            '@': path.resolve('./appfront'),
            ziggy: path.resolve('./vendor/tightenco/ziggy/dist/vue.es.js'),
        },
    },
    plugins: [
        laravel({
            input: 'appfront/app.ts',
            ssr: 'appfront/ssr.ts',
            refresh: true,
        }),
        /**
         * @see https://laravel.com/docs/10.x/vite#vue
         */
        vue({
            template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.
                    base: null,

                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.
                    includeAbsolute: false,
                },
            },
        }),
        /**
         * @see https://www.kitql.dev/docs/setup/03_vite-plugin-watch-and-run
         */
        watchAndRun([
            {
                name: 'ide-helper:models -W', //  -M
                run: 'php artisan ide-helper:models -W', //  -M
                watch: path.resolve('app/Models/**/*.php').replace(/\\/g, '/'),
            },
            {
                name: 'app:export-config',
                run: 'php artisan app:export-config',
                watch: path.resolve('config/**/*.php').replace(/\\/g, '/'),
            },
            {
                name: 'ziggy:generate',
                run: 'php artisan ziggy:generate',
                watch: path.resolve('routes/**/*.php').replace(/\\/g, '/'),
            },
        ]),
        beforeBuild(),
    ],

    /**
     * @see https://vitest.dev/config/#configuration
     */
    test: {
        environment: 'node',
        include: ['./tests/vitest/**/*.test.ts'],
        /**
         * @see https://github.com/vitest-dev/vitest/blob/95b1ba4c17df1677136b39762c19d859db3f4cb2/packages/vitest/src/types/coverage.ts
         */
        coverage: {
            reportsDirectory: './tests/vitest/.coverage',
            // include: ['src/utils/**/*.{ts,js}'],
            // Threshold
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
});

/* Custom plugins
------------------------------------------------*/

function beforeBuild(): Plugin {
    return {
        name: 'custom-plugin:before-build',
        async buildStart(options) {
            /**
             * This hook runs for both `app.ts` and `ssr.ts`.
             * Since there's no need to run the actions below
             * more than once, we'll just return early when
             * running for one of the mentioned files.
             */
            if (Array.isArray(options.input) && options.input.includes('appfront/ssr.ts')) {
                return;
            }

            /**
             * There's probably a better approache to checking if
             * this is a production build than using `this.meta.watchMode` 🤷‍♂️.
             */
            const envParam = this.meta.watchMode ? '' : '--env=production';

            await run(`php artisan app:export-config ${envParam}`.trim());
            await run(`php artisan ziggy:generate ${envParam}`.trim());
        },
    };
}

/* Helpers
------------------------------------------------*/

function run(command: string): Promise<string | ExecException> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);

                return;
            }

            if (stderr) {
                reject(stderr);

                return;
            }

            resolve(stdout);
        });
    });
}

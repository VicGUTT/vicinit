import { type ExecException, exec } from 'node:child_process';
import { type Plugin, defineConfig } from 'vite';
import path from 'node:path';
import laravel, { refreshPaths } from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import manifestSRI from 'vite-plugin-manifest-sri';
import watchAndRun from '@kitql/vite-plugin-watch-and-run';

/**
 * If you want to debug your dependencies by making local edits, you can:
 *     - Temporarily disable cache via the Network tab of your browser devtools;
 *     - Restart Vite dev server with the `--force` flag to re-bundle the deps;
 *     - Reload the page.
 *
 * @see https://vitejs.dev/guide/dep-pre-bundling#browser-cache
 */
export default defineConfig({
    build: {
        /**
         * @see https://vitejs.dev/config/#build-target
         */
        target: `es${new Date().getFullYear() - 2}`,
    },
    resolve: {
        alias: {
            '~': path.resolve('.'),
            '@': path.resolve('./appfront'),
        },
    },
    plugins: [
        laravel({
            input: 'appfront/app.ts',
            ssr: 'appfront/ssr.ts',
            refresh: {
                paths: [...refreshPaths, './appfront/views/app.blade.php'],
            },
        }),
        /**
         * @see https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
         * @see https://laravel.com/docs/11.x/vite#vue
         */
        vue({
            /**
             * Requires @vitejs/plugin-vue@^5.1.0
             */
            features: {
                /**
                 * Set to `false` to disable Options API support and allow related code in
                 * Vue core to be dropped via dead-code elimination in production builds,
                 * resulting in smaller bundles.
                 * - **default:** `true`
                 *
                 * Commented out as it breaks Inertia and potentially other dependencies.
                 */
                // optionsAPI: false,
            },
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
        tailwindcss(),
        vueDevTools(),
        manifestSRI(),
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
                name: 'ziggy:generate', // ziggy:generate --types
                run: 'php artisan ziggy:generate', // php artisan ziggy:generate --types
                watch: path.resolve('routes/**/*.php').replace(/\\/g, '/'),
            },
        ]),
        beforeBuild(),
    ],
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

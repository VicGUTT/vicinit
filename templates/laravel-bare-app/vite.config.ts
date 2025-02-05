import path from 'node:path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
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
            // '~': path.resolve('.'),
            '@': path.resolve('./resources/ts'),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/app.ts'],
            refresh: true,
        }),
        tailwindcss(),
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
        ]),
    ],
});

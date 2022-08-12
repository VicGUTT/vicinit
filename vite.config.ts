/// <reference types="vitest" />

// import fs from 'fs';
// import path from 'path';
import { defineConfig } from 'vite';

// const lib = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default defineConfig({
    // build: {
    //     /**
    //      * @see https://vitejs.dev/config/#build-target
    //      */
    //     target: `es${new Date().getFullYear() - 1}`,

    //     /**
    //      * @see https://vitejs.dev/config/#build-chunksizewarninglimit
    //      */
    //     chunkSizeWarningLimit: 10, // 10 kbs

    //     /**
    //      * @see https://vitejs.dev/config/#build-rollupoptions
    //      * @see https://rollupjs.org/guide/en/#big-list-of-options
    //      */
    //     rollupOptions: {
    //         input: './src/cli.ts',
    //         external: Object.keys(lib.dependencies),
    //     },

    //     /**
    //      * @see https://vitejs.dev/config/#build-lib
    //      * @see https://vitejs.dev/guide/build.html#library-mode
    //      */
    //     lib: {
    //         entry: path.resolve(__dirname, './src/cli.ts'),
    //         formats: ['es'],
    //         fileName: 'cli',
    //     },
    // },
    /**
     * @see https://vitest.dev/config/#configuration
     */
    test: {
        // global: true,
        environment: 'node',
        exclude: [
            '**/templates/**',
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
        ],
        /**
         * @see https://github.com/vitest-dev/vitest/blob/95b1ba4c17df1677136b39762c19d859db3f4cb2/packages/vitest/src/types/coverage.ts
         */
        coverage: {
            reportsDirectory: '.coverage',
            include: ['src/**/*.{ts,js}'],
            // Threshold
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90,
        },
    },
});

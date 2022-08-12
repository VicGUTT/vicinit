/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
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

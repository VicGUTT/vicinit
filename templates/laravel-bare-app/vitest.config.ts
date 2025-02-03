import path from 'node:path';
import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        /**
         * @see https://vitest.dev/config/#configuration
         */
        test: {
            environment: 'jsdom',
            include: ['./tests/vitest/**/*.test.ts'],
            root: path.resolve('./'),

            /**
             * @see https://github.com/vitest-dev/vitest/blob/95b1ba4c17df1677136b39762c19d859db3f4cb2/packages/vitest/src/types/coverage.ts
             */
            coverage: {
                include: ['resources/ts/**/*.{ts,js}'],
                reportsDirectory: './tests/vitest/.coverage',
                thresholds: {
                    statements: 90,
                    branches: 90,
                    functions: 90,
                    lines: 90,
                },
            },
        },
    })
);

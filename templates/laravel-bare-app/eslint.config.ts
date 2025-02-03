import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended';
import eslintNPlugin from 'eslint-plugin-n';
import eslintJsoncPlugin from 'eslint-plugin-jsonc';
import vitestPlugin from '@vitest/eslint-plugin';
import playwrightPlugin from 'eslint-plugin-playwright';

export default typescriptEslint.config(
    eslint.configs.recommended,
    typescriptEslint.configs.strictTypeChecked,
    typescriptEslint.configs.stylisticTypeChecked,
    eslintCommentsPlugin.recommended,
    eslintConfigPrettier,
    eslintPrettierPlugin,
    eslintNPlugin.configs['flat/recommended-module'],
    eslintJsoncPlugin.configs['flat/recommended-with-json5'],

    {
        ...vitestPlugin.configs.recommended,
        files: ['tests/vitest/**/*.{js,ts}'],
    },
    {
        ...playwrightPlugin.configs['flat/recommended'],
        files: ['tests/playwright/**/*.test.{js,ts}'],
    },

    {
        name: 'app/files-to-lint',
        files: ['resources/**/*.{js,ts}', 'tests/vitest/**/*.{js,ts}', 'tests/playwright/**/*.{js,ts}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: [
            '.husky',
            '.vic',
            'app',
            'bootstrap/cache',
            'bootstrap/ssr',
            'config',
            'database',
            'node_modules',
            'public',
            'resources/assets',
            'resources/css',
            'resources/lang',
            'resources/views',
            'resources/ts/vendor',
            'resources/tests/vitest/.coverage',
            'resources/tests/playwright/.test-results',
            'routes',
            'storage',
            'stubs',
            'tests/phpunit',
            'tests/vitest/.coverage',
            'tests/playwright/.test-results',
            'tests/playwright/.report',
            'vendor',
            '**/_ide_helper_models.php',
            '**/_ide_helper.php',
            '**/*.vic',
            '**/*.php',
            '**/*.json',
            '**/.phpstorm.meta.php',
            '**/package-lock.json',
            '**/composer.lock',
            '**/.prettierrc.json',
            '!**/.blade.php',
        ],
    },

    {
        name: 'custom/setup',
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',

            /**
             * @see https://typescript-eslint.io/getting-started/typed-linting
             */
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            curly: 'error',
            eqeqeq: 'error',
            yoda: 'error',

            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
            '@typescript-eslint/ban-ts-comment': ['error', { minimumDescriptionLength: 3 }],

            'n/no-missing-import': 'off',
            'n/no-missing-require': 'off',
            'n/file-extension-in-import': ['error', 'always'],
        },
    },

    {
        name: 'custom/package-json',
        files: ['package.json'],
        rules: {
            'jsonc/sort-keys': [
                'error',
                {
                    pathPattern: '^$',
                    order: [
                        'name',
                        'version',
                        'description',
                        'author',
                        'funding',
                        'license',
                        'keywords',

                        'type',
                        'main',
                        'module',
                        'types',
                        'typings',
                        'exports',
                        'files',
                        'engines',
                        'bin',
                        'scripts',

                        'devDependencies',
                        'dependencies',
                        'peerDependencies',
                        'peerDependenciesMeta',

                        'unpkg',
                        'homepage',
                        'repository',
                        'bugs',

                        'husky',
                        'size-limit',
                        'np',
                        'publishConfig',
                        'prettier',
                        'lint-staged',
                        'eslintConfig',
                    ],
                },
                {
                    pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
                    order: {
                        type: 'asc',
                    },
                },
            ],
        },
    }
);

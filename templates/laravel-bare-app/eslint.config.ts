import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended';
import eslintNPlugin from 'eslint-plugin-n';
import eslintJsoncPlugin from 'eslint-plugin-jsonc';

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
        name: 'app/files-to-lint',
        files: ['resources/**/*.{js,ts}', 'tests/vitest/**/*.{js,ts}', 'tests/playwright/**/*.{js,ts}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: [
            '.husky',
            '.vic',
            'app',
            'bootstrap',
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
            'tests',
            'vendor',
            '_ide_helper_models.php',
            '_ide_helper.php',
            '*.vic',
            '*.php',
            '.phpstorm.meta.php',
            'package-lock.json',
            'composer.lock',
            '!.prettierrc.json',
            '!.blade.php',
        ],
    },

    {
        name: 'custom/setup',
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            curly: 'error',
            eqeqeq: 'error',
            yoda: 'error',

            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-import-type-side-effects': 'error',

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

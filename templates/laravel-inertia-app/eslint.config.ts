import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintNPlugin from 'eslint-plugin-n';
import eslintJsoncPlugin from 'eslint-plugin-jsonc';
import vitestPlugin from '@vitest/eslint-plugin';
import playwrightPlugin from 'eslint-plugin-playwright';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
    eslintCommentsPlugin.recommended,
    eslintNPlugin.configs['flat/recommended-module'],
    eslintJsoncPlugin.configs['flat/recommended-with-json5'],

    pluginVue.configs['flat/recommended'],
    vueTsConfigs.recommended,

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
        files: ['appfront/**/*.{js,ts,vue}', 'tests/vitest/**/*.{js,ts}', 'tests/playwright/**/*.{js,ts}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: [
            '.husky',
            '.vic',
            'app',
            'appfront/vendor',
            'appfront/assets',
            'bootstrap/cache',
            'bootstrap/ssr',
            'config',
            'database',
            'node_modules',
            'public',
            'routes',
            'storage',
            'stubs',
            'tests/pest',
            'tests/playwright/.test-results',
            'tests/playwright/.report',
            'tests/vitest/.coverage',
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
        },
        rules: {
            curly: 'error',
            eqeqeq: 'error',
            yoda: 'error',

            'n/no-missing-import': 'off',
            'n/no-missing-require': 'off',
            'n/file-extension-in-import': ['error', 'always'],

            'vue/singleline-html-element-content-newline': 'off',
            'vue/component-definition-name-casing': ['error', 'kebab-case'],
            'vue/html-indent': ['error', 4],
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

                        'dependencies',
                        'devDependencies',
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
    },

    skipFormatting
);

import type { ProjectStep, Answers, InstallableDependencies } from '../types/index.js';
import fs from 'node:fs';
import LaravelBareApp from './LaravelBareApp.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';

export default class LaravelInertiaApp extends LaravelBareApp {
    public steps(): ProjectStep[] {
        return [
            this.createLaravelApp,
            this.setupGit,
            this.publishConfigFiles,
            this.copyTemplateDirectoryToTarget,
            this.removeUnnecessaryProjectFilesAfterTemplateDirectoryCopy,
            this.renameGitignore,
            this.updateComposerJson,
            this.updateProjectFiles,
            this.updatePackageJson,
            this.installNpmDependencies,
            this.requireComposerDependencies,
            this.removeUnnecessaryDependencies,
            this.installDependencies,
            this.generateAppKey,
            this.runAdditionalArtisanCommands,
            this.updateAdditionalFiles,
            this.runNpmBuild,
            this.formatProject,
            this.commitGit,
            this.openInVsCode,
        ];
    }

    protected async copyTemplateDirectoryToTarget(answers: Answers): Promise<void> {
        await super.copyTemplateDirectoryToTarget({ ...answers, template: 'laravel-bare-app' });
        await super.copyTemplateDirectoryToTarget(answers);
    }

    protected async removeUnnecessaryProjectFilesAfterTemplateDirectoryCopy(): Promise<void> {
        await super.removeUnnecessaryProjectFiles();

        await cmd.run(`rm -rf "${paths.target}/resources"`);
    }

    protected async updatePackageJson(answers: Answers): Promise<void> {
        const data = JSON.parse(fs.readFileSync(`${paths.target}/package.json`, 'utf-8'));

        await super.updatePackageJson(answers, {
            scripts: {
                ...data.scripts,
                dev: data.scripts['dev'],
                preview: data.scripts['preview'],
                build: data.scripts['build'],
                'build:strict': data.scripts['build:strict'],
                'build:types': 'vue-tsc --build',
                'build:loose': 'vite build && vite build --ssr',
                prod: data.scripts['prod'],
                ssr: 'php artisan inertia:start-ssr',
            },
        });
    }

    protected async makeComposerJsonNewData(data: ReturnType<JSON['parse']>): Promise<Record<string, unknown>> {
        const superData = await super.makeComposerJsonNewData(data);

        return {
            ...superData,
            autoload: {
                ...data.autoload,
                ...(superData.autoload ?? {}),
                files: ['bootstrap/helpers.php'],
            },
        };
    }

    protected getNpmDependenciesToInstall(): InstallableDependencies {
        const deps = super.getNpmDependenciesToInstall();

        return {
            regular: [
                ...deps.regular,
                '@inertiajs/vue3',
                '@vue/server-renderer',
                '@vueuse/core',
                'axios',
                'vue',
                'ziggy-js',
            ],
            dev: [
                ...deps.dev.filter((dep) => {
                    return ![
                        '@eslint/js',
                        'eslint-config-prettier',
                        'eslint-plugin-prettier',
                        'tslib',
                        'typescript-eslint',
                    ].includes(dep);
                }),
                '@inertiajs/core',
                '@types/ziggy-js',
                '@vitejs/plugin-vue',
                '@vue/eslint-config-prettier',
                '@vue/eslint-config-typescript',
                '@vue/test-utils',
                '@vue/tsconfig',
                'eslint-plugin-vue',
                'jiti',
                'vite-plugin-vue-devtools',
                'vue-tsc',
            ],
        };
    }

    protected getComposerDependenciesToRequire(): InstallableDependencies {
        const deps = super.getComposerDependenciesToRequire();

        return {
            regular: [...deps.regular, 'inertiajs/inertia-laravel', 'tightenco/ziggy'],
            dev: deps.dev,
        };
    }

    protected getAdditionalFilesToUpdate(): Record<string, Record<string, string>> {
        return {
            ...super.getAdditionalFilesToUpdate(),
            [`${paths.target}/.vscode/extensions.json`]: {
                '"recommendations": [': '"recommendations": [\n        "Vue.volar",',
            },
            [`${paths.target}/bootstrap/app.php`]: {
                'use App\\Http\\Middleware\\AddContentSecurityPolicyHeaders;':
                    'use App\\Http\\Middleware\\AddContentSecurityPolicyHeaders;\nuse App\\Http\\Middleware\\HandleInertiaRequests;',
                'AddContentSecurityPolicyHeaders::class,':
                    'AddContentSecurityPolicyHeaders::class,\n            HandleInertiaRequests::class,',
            },
            [`${paths.target}/config/view.php`]: {
                "resource_path('views'),": "// resource_path('views'),\n        front_path('views'),",
            },
            [`${paths.target}/phpstan.neon`]: {
                '# - bootstrap/helpers.php': '- bootstrap/helpers.php',
            },
            [`${paths.target}/vitest.config.ts`]: {
                "'resources/ts/**/*.{ts,js}'": "'appfront/**/*.{ts,js,vue}'",
            },
        };
    }
}

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
            this.copyTemplateDirectoryToTarget,
            this.removeUnnecessaryProjectFilesAfterTemplateDirectoryCopy,
            this.renameGitignore,
            this.updateComposerJson,
            this.updatePackageJson,
            this.updateProjectFiles,
            this.installNpmDependencies,
            this.requireComposerDependencies,
            this.installDependencies,
            this.runAdditionalArtisanCommands,
            this.updateAdditionalFiles,
            this.formatProject,
            this.commitGit,
            this.generateAppKey,
            this.openInVsCode,
        ];
    }

    protected async copyTemplateDirectoryToTarget(answers: Answers): Promise<void> {
        super.copyTemplateDirectoryToTarget({ ...answers, template: 'laravel-bare-app' });
        super.copyTemplateDirectoryToTarget(answers);
    }

    protected async removeUnnecessaryProjectFilesAfterTemplateDirectoryCopy(): Promise<void> {
        await cmd.run(`rm "${paths.target}/vite.config.js"`);
        await cmd.run(`rm -rf "${paths.target}/resources"`);
        await cmd.run(`rm -rf "${paths.target}/tests/Feature"`);
        await cmd.run(`rm -rf "${paths.target}/tests/Unit"`);
        await cmd.run(`rm -rf "${paths.target}/tests/CreatesApplication.php"`);
        await cmd.run(`rm -rf "${paths.target}/tests/TestCase.php"`);
    }

    protected async updatePackageJson(answers: Answers): Promise<void> {
        const data = JSON.parse(fs.readFileSync(`${paths.target}/package.json`, 'utf-8'));

        await super.updatePackageJson(answers, {
            scripts: {
                ...data.scripts,
                build: 'vue-tsc --noEmit && vite build && vite build --ssr',
                'pw:[filtered]': 'playwright test tests/playwright/src/index.test.ts --project=chromium',
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
            'autoload-dev': {
                ...(data['autoload-dev'] ?? {}),
                ...(superData['autoload-dev'] ?? {}),
                'psr-4': {
                    ...(data['autoload-dev']?.['psr-4'] ?? {}),
                    ...((superData['autoload-dev'] as Record<string, unknown> | undefined)?.['psr-4'] ?? {}),
                    'Tests\\': 'tests/phpunit',
                },
            },
        };
    }

    protected getNpmDependenciesToInstall(): InstallableDependencies {
        const deps = super.getNpmDependenciesToInstall();

        return {
            regular: [...deps.regular, '@inertiajs/vue3', '@vue/server-renderer', '@vueuse/core', 'axios', 'vue'],
            dev: [...deps.dev, '@types/ziggy-js', '@vitejs/plugin-vue', 'vue-tsc', 'eslint-plugin-vue'],
        };
    }

    protected getComposerDependenciesToRequire(): InstallableDependencies {
        const deps = super.getComposerDependenciesToRequire();

        return {
            regular: [...deps.regular, 'inertiajs/inertia-laravel', 'tightenco/ziggy'],
            dev: deps.dev,
        };
    }

    protected getAdditionalArtisanCommandsToRun(): string[] {
        return [...super.getAdditionalArtisanCommandsToRun(), 'vendor:publish --provider="Inertia\\ServiceProvider"'];
    }

    protected getAdditionalFilesToUpdate(): Record<string, Record<string, string>> {
        return {
            ...super.getAdditionalFilesToUpdate(),
            [`${paths.target}/phpunit.xml`]: {
                'tests/Unit': 'tests/phpunit/Unit',
                'tests/Feature': 'tests/phpunit/Feature',
            },
            [`${paths.target}/tailwind.config.ts`]: {
                'export default {': `
                export default {
                    content: [
                        // './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
                        // './storage/framework/views/*.php',
                        // './app/View/**/*.php',
                        // './resources/**/*.{blade.php,js,ts,vue,css}',
                        './appfront/**/*.{ts,vue,css}',
                        // './appfront/app.blade.php',
                    ],`,
            },
            [`${paths.target}/package.json`]: {
                '"preview": "vite preview",': `
                "preview": "vite preview",
                "ssr": "php artisan inertia:start-ssr",
                `,
            },
            [`${paths.target}/tsconfig.json`]: {
                'resources/ts': 'appfront',
                resources: 'appfront',
            },
            [`${paths.target}/app/Http/Kernel.php`]: {
                '\\App\\Http\\Middleware\\VerifyCsrfToken::class,\n            \\Illuminate\\Routing\\Middleware\\SubstituteBindings::class,':
                    '\\App\\Http\\Middleware\\VerifyCsrfToken::class,\n            \\Illuminate\\Routing\\Middleware\\SubstituteBindings::class,\n            \\App\\Http\\Middleware\\HandleInertiaRequests::class,',
            },
            [`${paths.target}/config/view.php`]: {
                "resource_path('views'),": "// resource_path('views'),\n        front_path(),",
            },
            [`${paths.target}/routes/web.php`]: {
                'use Illuminate\\Support\\Facades\\Route;': `
                use Inertia\\Response;
                use Illuminate\\Support\\Facades\\Route;
                `,
                'function () {': 'function (): Response {',
                "view('welcome')": "inertia('welcome')",
                '});': "})->name('welcome');",
            },
        };
    }
}

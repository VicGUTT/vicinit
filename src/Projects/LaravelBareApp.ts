import type { ProjectStep, Answers, InstallableDependencies } from '../types/index.js';
import fs from 'node:fs';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import action from '../utils/action.js';
import replaceInDirectory from '../utils/replaceInDirectory.js';
import replaceInFile from '../utils/replaceInFile.js';

export default class LaravelBareApp extends Project {
    public steps(): ProjectStep[] {
        return [
            this.createLaravelApp,
            this.setupGit,
            this.removeUnnecessaryProjectFiles,
            this.copyTemplateDirectoryToTarget,
            this.renameGitignore,
            this.generateAppKey,
            this.publishConfigFiles,
            this.updateComposerJson,
            this.updateProjectFiles,
            this.installNpmDependencies,
            this.requireComposerDependencies,
            this.installDependencies,
            this.runAdditionalArtisanCommands,
            this.updateAdditionalFiles,
            this.runNpmBuild,
            this.formatProject,
            this.commitGit,
            this.openInVsCode,
        ];
    }

    protected async createLaravelApp(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer create-project --prefer-dist laravel/laravel .`);
        // await cmd.run(`composer create-project --prefer-dist laravel/laravel . dev-master`); // for the latest unreleased version
    }

    protected async removeUnnecessaryProjectFiles(): Promise<void> {
        await cmd.run(`rm "${paths.target}/vite.config.js"`);
        await cmd.run(`rm -rf "${paths.target}/resources/js"`);
    }

    protected async generateAppKey(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`php artisan key:generate --ansi`);
    }

    protected async publishConfigFiles(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`php artisan config:publish --all`);
    }

    protected async updateComposerJson(answers: Answers): Promise<void> {
        const data = JSON.parse(fs.readFileSync(`${paths.target}/composer.json`, 'utf-8'));

        await super.updateComposerJson(answers, await this.makeComposerJsonNewData(data));
    }

    protected async updateProjectFiles(answers: Answers): Promise<void> {
        await action("Updating the project's files", async () => {
            const tokens = this.getReplaceableTokens(answers);

            await replaceInDirectory(paths.target, tokens);

            await replaceInDirectory(`${paths.target}/config`, {
                "'Laravel'": `'${tokens['{project-name}']}'`,
                "'laravel'": `'${tokens['{project-name}']}'`,
                "'driver' => env('HASH_DRIVER', 'bcrypt'),": `'driver' => env('HASH_DRIVER', 'argon2id'),`, // hashing.php
                "'encrypt' => env('SESSION_ENCRYPT', false),": `'encrypt' => env('SESSION_ENCRYPT', env('APP_ENV') !== 'local'),`, // session.php
                "env('SESSION_SECURE_COOKIE')": `env('SESSION_SECURE_COOKIE', str_starts_with((string) env('APP_URL', 'https'), 'https'))`, // session.php
                "explode(',', env(": "explode(',', (string) env(", // app.php, logging.php
                'Str::slug(env(': 'Str::slug((string) env(', // cache.php, database.php, session.php
                'parse_url(env(': 'parse_url((string) env(', // mail.php
            });

            replaceInFile(`${paths.target}/bootstrap/providers.php`, {
                'App\\Providers\\AppServiceProvider::class,':
                    'App\\Providers\\AppServiceProvider::class,\n    App\\Providers\\RouteServiceProvider::class,',
            });
        });
    }

    protected async installDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer install`);
        await cmd.run(`npm i`);
    }

    protected async runAdditionalArtisanCommands(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);

        const commands = this.getAdditionalArtisanCommandsToRun();

        for (const command of commands) {
            await cmd.run(`php artisan ${command}`);
        }
    }

    protected async updateAdditionalFiles(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);

        await action('Updating additional files', async () => {
            const entries = this.getAdditionalFilesToUpdate();

            for (const [filePath, replacements] of Object.entries(entries)) {
                replaceInFile(filePath, replacements);
            }
        });
    }

    protected async runNpmBuild(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`npm run build`);
    }

    protected async formatProject(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer fix`);
        await cmd.run(`npm run fix`);
        await cmd.run(`npm run format:fix`);
    }

    protected async makeComposerJsonNewData(data: ReturnType<JSON['parse']>): Promise<Record<string, unknown>> {
        return {
            name: '{vendor-slug}/{project-slug}',
            license: 'proprietary',
            homepage: 'https://github.com/{vendor-slug}/{project-slug}',
            require: {
                ...data.require,
                php: `^${await this.getPhpVersion()}`,
            },
            scripts: {
                analyse: 'vendor/bin/phpstan analyse --memory-limit=1G',
                lint: 'composer analyse',

                test: 'php artisan test',
                'test:coverage': 'php artisan test --coverage --min=90',

                format: 'vendor/bin/pint --test',
                'format:fix': 'vendor/bin/pint',
                fix: 'composer format:fix',

                ...data.scripts,

                'post-update-cmd': [
                    ...(data.scripts['post-update-cmd'] ?? []),
                    'Illuminate\\Foundation\\ComposerScripts::postUpdate',
                    '@php artisan stub:publish',
                    '@php artisan ide-helper:generate',
                    '@php artisan ide-helper:meta',
                ],
            },
            config: {
                ...data.config,
                'allow-plugins': {
                    ...data.config['allow-plugins'],
                    'pestphp/pest-plugin': true,
                    'phpstan/extension-installer': true,
                },
            },
        };
    }

    protected getNpmDependenciesToInstall(): InstallableDependencies {
        return {
            regular: ['@vicgutt/isjs', '@vicgutt/macrojs', '@vicgutt/strjs'],
            dev: [
                '@commitlint/cli',
                '@commitlint/config-conventional',
                '@eslint-community/eslint-plugin-eslint-comments',
                '@eslint/js',
                '@kitql/vite-plugin-watch-and-run',
                '@playwright/test',
                '@tailwindcss/vite',
                '@tsconfig/node22',
                '@types/jsdom',
                '@types/node',
                // '@vicgutt/tailwindcss-opinionated-preset',
                '@vitest/coverage-v8',
                '@vitest/eslint-plugin',
                'eslint',
                'eslint-config-prettier',
                'eslint-plugin-jsonc',
                'eslint-plugin-n',
                'eslint-plugin-playwright',
                'eslint-plugin-prettier',
                'jsdom',
                'husky',
                'laravel-vite-plugin',
                'lint-staged',
                'npm-run-all2',
                'prettier',
                'prettier-plugin-tailwindcss',
                'tailwindcss',
                'tslib',
                'typescript',
                'typescript-eslint',
                'vite',
                'vite-plugin-manifest-sri',
                'vitest',
            ],
        };
    }

    protected getComposerDependenciesToRequire(): InstallableDependencies {
        return {
            regular: ['vicgutt/laravel-stubs'],
            dev: ['barryvdh/laravel-ide-helper', 'laravel/pint', 'larastan/larastan'],
        };
    }

    protected getAdditionalArtisanCommandsToRun(): string[] {
        return [
            'vendor:publish --provider="Barryvdh\\LaravelIdeHelper\\IdeHelperServiceProvider" --tag=config',
            'migrate',
        ];
    }

    protected getAdditionalFilesToUpdate(): Record<string, Record<string, string>> {
        return {
            [`${paths.target}/config/ide-helper.php`]: {
                // "'write_model_magic_where' => true,": "'write_model_magic_where' => false,",
                'Filament\\Support\\Concerns\\Macroable::class,': '// Filament\\Support\\Concerns\\Macroable::class,',
                'Spatie\\Macroable\\Macroable::class,': '// Spatie\\Macroable\\Macroable::class,',
            },
        };
    }
}

import { type ProjectStep, type Answers } from '../types/index.js';
import fs from 'fs';
import str from '@vicgutt/strjs';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import exec from '../utils/exec.js';
import action from '../utils/action.js';
import replaceInDirectory from '../utils/replaceInDirectory.js';
import replaceInFile from '../utils/replaceInFile.js';
import renameFile from '../utils/renameFile.js';

export default class LaravelBareApp extends Project {
    public steps(): ProjectStep[] {
        return [
            this.createLaravelApp,
            this.setupGit,
            this.removeUnnecessaryProjectFiles,
            this.copyTemplateDirectoryToTarget,
            this.renameGitignore,
            this.updateComposerJson,
            this.updateProjectFiles,
            this.generateAppKey,
            this.requireComposerDependencies,
            this.installDependencies,
            this.runAdditionalArtisanCommands,
            this.updateAdditionalFiles,
            this.formatProject,
            this.commitGit,
            this.openInVsCode,
        ];
    }

    protected async createLaravelApp(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer create-project --prefer-dist laravel/laravel .`);
    }

    protected async removeUnnecessaryProjectFiles(): Promise<void> {
        await cmd.run(`rm "${paths.target}/vite.config.js"`);
        await cmd.run(`rm -rf "${paths.target}/resources/js"`);
    }

    protected async renameGitignore(): Promise<void> {
        /**
         * When building for prod, NPM will take into account the contents
         * of the `.gitignore` file to know which files and folders to not
         * include in the final bundle.
         * As the Laravel app template's `.gitignore` includes files we
         * actually want in the final bundle such as the `.env` file, we
         * had to give the `.gitignore` a temporary name, then rename it
         * once the files has been copied over to the currently creating project.
         *
         * The second parameter here is an empty string, because `renameFile`
         * attempts to detect and append the file extension. If the second
         * parameter were to be `.gitignore` then the resulting file name
         * would be `.gitignore.gitignore`.
         */
        renameFile(`${paths.target}/_.gitignore`, '');
    }

    protected async updateComposerJson(answers: Answers): Promise<void> {
        const data = JSON.parse(fs.readFileSync(`${paths.target}/composer.json`, 'utf-8'));

        await super.updateComposerJson(answers, {
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
        });
    }

    protected async updateProjectFiles(answers: Answers): Promise<void> {
        await action("Updating the project's files", async () => {
            const tokens = this.getReplaceableTokens(answers);

            await replaceInDirectory(paths.target, tokens);

            await replaceInDirectory(`${paths.target}/config`, {
                "'Laravel'": `'${tokens['{project-name}']}'`,
                "'laravel'": `'${tokens['{project-name}']}'`,
                "'driver' => 'bcrypt',": `'driver' => 'argon2id',`, // hashing.php
                "'encrypt' => false,": `'encrypt' => env('APP_ENV') !== 'local',`, // session.php
                "env('SESSION_SECURE_COOKIE')": `env('SESSION_SECURE_COOKIE', str_starts_with(env('APP_URL', 'https'), 'https'))`, // session.php
                // 'Str::slug(env(': 'Str::slug((string) env(',
                // "explode(',', env(": "explode(',', (string) env(",
            });
        });
    }

    protected async generateAppKey(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`php artisan key:generate --ansi`);
    }

    protected async requireComposerDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);

        const deps = this.getComposerDependenciesToRequire();

        if (deps.regular.length) {
            await cmd.run(`composer require ${deps.regular.join(' ')}`);
        }

        if (deps.dev.length) {
            await cmd.run(`composer require --dev ${deps.dev.join(' ')}`);
        }
    }

    protected async installDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer install`);
        await cmd.run(`npm i`);
    }

    protected async runAdditionalArtisanCommands(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);

        const commands = [
            'vendor:publish --provider="Barryvdh\\LaravelIdeHelper\\IdeHelperServiceProvider" --tag=config',
        ];

        for (const command of commands) {
            await cmd.run(`php artisan ${command}`);
        }
    }

    protected async updateAdditionalFiles(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);

        await action('Updating additional files', async () => {
            const entries = {
                [`${paths.target}/config/ide-helper.php`]: {
                    "'write_model_magic_where' => true,": "'write_model_magic_where' => false,",
                },
            };

            for (const [filePath, replacements] of Object.entries(entries)) {
                replaceInFile(filePath, replacements);
            }
        });
    }

    protected async formatProject(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer fix`);
        await cmd.run(`npm run fix`);
        await cmd.run(`npm run format:fix`);
    }

    protected async getPhpVersion(): Promise<number> {
        return +str(await exec(`php -v`))
            .between('PHP', '(cli)')
            .trim()
            .beforeLast('.');
    }

    protected getComposerDependenciesToRequire() {
        return {
            regular: ['vicgutt/laravel-stubs'],
            dev: ['barryvdh/laravel-ide-helper', 'laravel/pint', 'nunomaduro/larastan'],
        };
    }
}

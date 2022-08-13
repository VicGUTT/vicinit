import { type ProjectStep, type Answers } from '../types';
import fs from 'fs';
import str from '@vicgutt/strjs';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import exec from '../utils/exec.js';
import action from '../utils/action.js';
import replaceInDirectory from '../utils/replaceInDirectory.js';

export default class LaravelBareApp extends Project {
    public steps(): ProjectStep[] {
        return [
            this.createLaravelApp,
            this.setupGit,
            this.removeUnnecessaryProjectFiles,
            this.copyTemplateDirectoryToTarget,
            this.updateComposerJson,
            this.updateProjectFiles,
            this.generateAppKey,
            this.requireComposerDependencies,
            this.installDependencies,
            this.formatProject,
            this.commitGit,
        ];
    }

    protected async createLaravelApp(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer create-project --prefer-dist laravel/laravel .`);
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
                'test:coverage': 'php artisan test --coverage',

                format: 'vendor/bin/pint —test',
                'format:fix': 'vendor/bin/pint',
                fix: 'composer format:fix',

                ...data.scripts,
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
                // 'Str::slug(env(': 'Str::slug((string) env(',
                // "explode(',', env(": "explode(',', (string) env(",
            });
        });
    }

    protected async removeUnnecessaryProjectFiles(): Promise<void> {
        await cmd.run(`rm "${paths.target}/vite.config.js"`);
        await cmd.run(`rm -rf "${paths.target}/resources/js"`);
    }

    protected async generateAppKey(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`php artisan key:generate`);
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

    protected async formatProject(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer format`);
        await cmd.run(`npm run fix`);
        await cmd.run(`npm run format:fix`);
    }

    protected async commitGit(): Promise<void> {
        await cmd.git.save('feat: setup');
    }

    protected async getPhpVersion(): Promise<number> {
        return +str(await exec(`php -v`))
            .between('PHP', '(cli)')
            .trim()
            .beforeLast('.');
    }

    protected getComposerDependenciesToRequire() {
        return {
            regular: [],
            dev: ['barryvdh/laravel-ide-helper', 'laravel/pint', 'nunomaduro/larastan'],
        };
    }
}

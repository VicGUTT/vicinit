import { type ProjectStep, type Answers } from '../types';
import str from '@vicgutt/strjs';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import renameFile from '../utils/renameFile.js';
import promisify from '../utils/promisify.js';

export default class LaravelLib extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
            this.updateProjectFiles,
            this.updateProjectFileNames,
            this.updateConfigFileIfNecessary,
            this.updateComposerJson,
            this.setupGit,
            this.installDependencies,
            this.formatProject,
            this.commitGit,
        ];
    }

    /**
     * Spatie's "laravel-package-tools" expects the config file to
     * not be prefixed with "laravel-" by default.
     * Let try to abide by that convention.
     */
    protected async updateConfigFileIfNecessary(answers: Answers): Promise<void> {
        return promisify(() => {
            const projectSlug = this.getReplaceableTokens(answers)['{project-slug}'];
            const prefix = 'laravel-';

            if (!projectSlug.startsWith(prefix)) {
                return;
            }

            renameFile(`${paths.target}/config/${projectSlug}.php`, str.after(projectSlug, prefix));
        });
    }

    protected async installDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer install`);
        await cmd.run(`npm i`);
    }

    protected async formatProject(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`composer format`);
    }

    protected async commitGit(): Promise<void> {
        await cmd.git.save('feat: setup');
    }
}

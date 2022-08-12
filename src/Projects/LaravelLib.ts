import { type ProjectStep, type Answers } from '../types';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import action from '../utils/action.js';
import setInDependencyManager from '../utils/setInDependencyManager.js';

export default class LaravelLib extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
            this.updateProjectFiles,
            this.updateProjectFileNames,
            this.updateComposerJson,
            this.setupGit,
            this.installDependencies,
            this.formatProject,
            this.commitGit,
        ];
    }

    protected async updateComposerJson(answers: Answers): Promise<void> {
        await action("Updating the project's composer.json", async () => {
            await setInDependencyManager(`${paths.target}/composer.json`, {
                description: answers.description,
                keywords: answers.keywords,
            });
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

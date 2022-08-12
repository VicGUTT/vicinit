import { type ProjectStep, type Answers } from '../types';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import action from '../utils/action.js';
import setInDependencyManager from '../utils/setInDependencyManager.js';

export default class TsLit extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
            this.updateProjectFiles,
            this.updatePackageJson,
            this.setupGit,
            this.installDependencies,
            this.commitGit,
        ];
    }

    protected async updatePackageJson(answers: Answers): Promise<void> {
        await action("Updating the project's package.json", async () => {
            await setInDependencyManager(`${paths.target}/package.json`, {
                description: answers.description,
                keywords: answers.keywords,
            });
        });
    }

    protected async installDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`npm i`);
    }

    protected async commitGit(): Promise<void> {
        await cmd.git.save('feat: installed dependencies');
    }
}

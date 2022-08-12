import { type ProjectStep, type Answers } from '../types';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import action from '../utils/action.js';
import copyDir from '../utils/copyDir.js';
import replaceInDirectory from '../utils/replaceInDirectory.js';
import setInDependencyManager from '../utils/setInDependencyManager.js';

export default class TsLit extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
            this.updatePackageJson,
            this.setupGit,
            this.installDependencies,
            this.commitGit,
        ];
    }

    protected async copyTemplateDirectoryToTarget(answers: Answers): Promise<void> {
        await action('Copying the template files and directories to the target path', () => {
            return copyDir(`${paths.templates}/${answers.template}`, paths.target);
        });
    }

    protected async updatePackageJson(answers: Answers): Promise<void> {
        await action("Updating the project's package.json", async () => {
            await replaceInDirectory(paths.target, { '{project-name}': answers.name });
            await setInDependencyManager(`${paths.target}/package.json`, {
                description: answers.description,
                keywords: answers.keywords,
            });
        });
    }

    protected async setupGit(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.git.setup();
    }

    protected async installDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`npm i`);
    }

    protected async commitGit(): Promise<void> {
        await cmd.git.save('feat: installed dependencies');
    }
}

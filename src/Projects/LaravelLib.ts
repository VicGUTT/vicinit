import { type ProjectStep, type Answers } from '../types';
import str from '@vicgutt/strjs';
import Project from './Project.js';
import constants from '../constants/index.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import action from '../utils/action.js';
import copyDir from '../utils/copyDir.js';
import replaceInDirectory from '../utils/replaceInDirectory.js';
import renameInDirectory from '../utils/renameInDirectory.js';
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

    protected async copyTemplateDirectoryToTarget(answers: Answers): Promise<void> {
        await action('Copying the template files and directories to the target path', () => {
            return copyDir(`${paths.templates}/${answers.template}`, paths.target);
        });
    }

    protected async updateProjectFiles(answers: Answers): Promise<void> {
        await action("Updating the project's files", async () => {
            await replaceInDirectory(paths.target, this.getReplaceableTokens(answers));
        });
    }

    protected async updateProjectFileNames(answers: Answers): Promise<void> {
        await action("Updating the project's file names", async () => {
            await renameInDirectory(paths.target, this.getReplaceableTokens(answers));
        });
    }

    protected async updateComposerJson(answers: Answers): Promise<void> {
        await action("Updating the project's composer.json", async () => {
            await setInDependencyManager(`${paths.target}/composer.json`, {
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

    protected getReplaceableTokens(answers: Answers): Record<string, string> {
        const vendorName = constants.VENDOR_NAME;
        const projectName = answers.name;

        return {
            '{author-name}': constants.AUTHOR_NAME,
            '{author-email}': constants.AUTHOR_EMAIL,
            '{author-username}': constants.AUTHOR_USERNAME,
            '{author-url}': constants.AUTHOR_URL,
            '{vendor-name}': vendorName,
            '{vendor-namespace}': constants.VENDOR_NAMESPACE,
            '{vendor-slug}': str.slug(vendorName),
            '{project-name}': projectName,
            '{project-description}': answers.description + '',
            '{project-slug}': str.slug(projectName),
            '{project-classname}': str.studly(projectName),
            '{project-classname-variable}': str.camel(projectName),
        };
    }
}

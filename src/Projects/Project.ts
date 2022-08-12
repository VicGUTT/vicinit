import { type ProjectStep, type Answers, type DerivedProject } from '../types';
import str from '@vicgutt/strjs';
import constants from '../constants/index.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';
import action from '../utils/action.js';
import copyDir from '../utils/copyDir.js';
import replaceInDirectory from '../utils/replaceInDirectory.js';
import renameInDirectory from '../utils/renameInDirectory.js';

export default abstract class Project {
    protected CACHE: Record<string, unknown> =  {};
    
    // public abstract init(): void;
    public abstract steps(): ProjectStep[];

    public static async handle(answers: Answers): Promise<void> {
        cmd.line();

        const instance = new (this as unknown as DerivedProject)();

        for (const step of instance.steps()) {
            await step.bind(instance)(answers);

            cmd.line();
        }
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

    protected async setupGit(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.git.setup();
    }

    protected getReplaceableTokens(answers: Answers): Record<string, string> {
        if (this.CACHE['replaceableTokens']) {
            return this.CACHE['replaceableTokens'] as Record<string, string>;
        }
        
        const vendorName = constants.VENDOR_NAME;
        const projectName = answers.name;

        this.CACHE['replaceableTokens'] = {
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

        return this.CACHE['replaceableTokens'] as Record<string, string>;
    }
}

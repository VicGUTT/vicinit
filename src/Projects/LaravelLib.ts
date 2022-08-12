import { type ProjectStep, type Answers } from '../types';
import Project from './Project.js';
import paths from '../utils/paths.js';
import action from '../utils/action.js';
import copyDir from '../utils/copyDir.js';

export default class LaravelLib extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
        ];
    }

    protected async copyTemplateDirectoryToTarget(answers: Answers): Promise<void> {
        await action('Copying the template files and directories to the target path', () => {
            return copyDir(`${paths.templates}/${answers.template}`, paths.target);
        });
    }
}

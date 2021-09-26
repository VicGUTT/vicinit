import { Ora, oraPromise } from 'ora';
import paths from '../paths.js';
import { Answers } from '../types';
import copyDir from '../utils/copyDir.js';

export default async function duplicateTemplateToTarget(answers: Answers): Promise<void> {
    return oraPromise(async (spinner: Ora) => {
        spinner.text = 'Setting up the template';

        await copyDir(`${paths.templates}/${answers.template}`, paths.target);

        spinner.succeed();
    });
}

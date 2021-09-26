import { oraPromise, Ora } from 'ora';
import paths from '../paths.js';
import { Answers } from '../types';
import exec from '../utils/exec.js';

export default async function installDependencies(answers: Answers): Promise<void> {
    return oraPromise(async (spinner: Ora) => {
        await exec(`cd ${paths.target}`, { silent: true });

        spinner.text = 'Running `npm i`';

        try {
            await exec(`npm i`, { silent: true });

            spinner.succeed();
        } catch (error) {
            spinner.fail();
        }

        if (!answers.template.includes('laravel')) {
            return;
        }

        spinner.text = 'Running `composer install`';

        try {
            await exec(`composer install`, { silent: true });

            spinner.succeed();
        } catch (error) {
            spinner.fail();
        }
    });
}

import { Ora, oraPromise } from 'ora';
import paths from '../paths.js';
import exec from '../utils/exec.js';

export default async function commitGit(commitMessage: string): Promise<void> {
    return oraPromise(async (spinner: Ora) => {
        await exec(`cd ${paths.target}`, { silent: true });

        spinner.text = 'Running `git add .`';

        try {
            await exec(`git add .`, { silent: true });

            spinner.succeed();
        } catch (error) {
            spinner.fail();
        }

        spinner.text = `Running \`git commit -m "${commitMessage}"\``;

        try {
            await exec(`git commit -m "${commitMessage}"`, { silent: true });

            spinner.succeed();
        } catch (error) {
            spinner.fail();
        }
    });
}

import { Ora, oraPromise } from 'ora';
import paths from '../paths.js';
import exec from '../utils/exec.js';
import commitGit from './commitGit.js';

export default async function setupGit(): Promise<void> {
    return oraPromise(async (spinner: Ora) => {
        await exec(`cd ${paths.target}`, { silent: true });

        spinner.text = 'Running `git init --initial-branch=main`';

        try {
            // Requires Git v2.28.0+ for the "--initial-branch=main" option
            await exec(`git init --initial-branch=main`, { silent: true });

            spinner.succeed();
        } catch (error) {
            spinner.fail();
        }

        commitGit('feat: initial commit');
    });
}

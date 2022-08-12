import { type Ora, oraPromise } from 'ora';
import { type ExecOptions } from 'shelljs';
import exec from '../utils/exec.js';

export default async function run(command: string, options: ExecOptions = { silent: true }): Promise<string | null> {
    return oraPromise(async (spinner: Ora) => {
        spinner.text = `Running \`"${command}"\``;

        try {
            const result = await exec(command, options);

            spinner.succeed();

            return result;
        } catch (error) {
            spinner.fail();

            return null;
        }
    });
}

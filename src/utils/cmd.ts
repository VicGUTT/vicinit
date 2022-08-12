import ora, { type Ora } from 'ora';
import git from './git.js';
import run from './run.js';

export default {
    git,
    run,
    line(text = ''): boolean {
        return process.stdout.write(`${text}\n`);
    },
    // success(text?: string): Ora {
    //     return ora().succeed(text);
    // },
    // error(text?: string): Ora {
    //     return ora().fail(text);
    // },
    // warn(text?: string): Ora {
    //     return ora().warn(text);
    // },
    info(text?: string): Ora {
        return ora().info(text);
    },
};

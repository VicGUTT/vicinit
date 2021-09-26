import shell, { ExecOptions } from 'shelljs';

/**
 * @see https://github.com/shelljs/shelljs/issues/2#issuecomment-597355217
 */
export default async function exec(cmd: string, opts: ExecOptions = {}): Promise<string> {
    return new Promise(function (resolve, reject) {
        shell.exec(cmd, opts, function (code, stdout, stderr) {
            if (code !== 0) {
                return reject(new Error(stderr));
            }

            return resolve(stdout);
        });
    });
}

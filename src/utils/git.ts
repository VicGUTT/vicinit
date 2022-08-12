import run from './run.js';

export default {
    // /**
    //  * Initialize a git repository with an initial branch of "main".
    //  */
    // async init(): Promise<string | null> {
    //     return run(`git init --initial-branch=main`);
    // },
    /**
     * Git add all and commit.
     */
    async save(message: string): Promise<string | null> {
        return run(`git add . && git commit -m "${message}"`);
    },
    /**
     * Git init and commit.
     */
    async setup(): Promise<string | null> {
        // return Promise.all([this.init(), this.save('feat: initial commit')]);
        return run(`git init --initial-branch=main && git add . && git commit -m "feat: initial commit"`);
    },
};

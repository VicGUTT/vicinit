import { type ProjectStep } from '../types';
import Project from './Project.js';
import paths from '../utils/paths.js';
import cmd from '../utils/cmd.js';

export default class TsLit extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
            this.updateProjectFiles,
            this.updatePackageJson,
            this.setupGit,
            this.installDependencies,
            this.commitGit,
        ];
    }

    protected async installDependencies(): Promise<void> {
        await cmd.run(`cd ${paths.target}`);
        await cmd.run(`npm i`);
    }

    protected async commitGit(): Promise<void> {
        await cmd.git.save('feat: installed dependencies');
    }
}

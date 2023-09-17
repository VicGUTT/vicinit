import { type ProjectStep } from '../types/index.js';
import Project from './Project.js';

export default class TsLib extends Project {
    public steps(): ProjectStep[] {
        return [
            this.copyTemplateDirectoryToTarget,
            this.renameGitignore,
            this.updateProjectFiles,
            this.updatePackageJson,
            this.setupGit,
            this.installNpmDependencies,
            this.commitGit,
            this.openInVsCode,
        ];
    }

    protected getNpmDependenciesToInstall() {
        return {
            regular: [],
            dev: [
                '@commitlint/cli',
                '@commitlint/config-conventional',
                '@size-limit/preset-small-lib',
                '@types/node',
                '@typescript-eslint/eslint-plugin',
                '@typescript-eslint/parser',
                'c8',
                'eslint',
                'eslint-config-prettier',
                'eslint-plugin-eslint-comments',
                'eslint-plugin-jsonc',
                'eslint-plugin-n',
                'eslint-plugin-prettier',
                'husky',
                'lint-staged',
                'np',
                'pinst',
                'prettier',
                'size-limit',
                'tslib',
                'typescript',
                'vite',
                'vitest',
            ],
        };
    }
}

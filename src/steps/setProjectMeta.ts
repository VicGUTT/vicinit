import fs from 'fs';
import { Ora, oraPromise } from 'ora';
import path from 'path';
import paths from '../paths.js';
import { Answers } from '../types';

export default async function setProjectMeta(answers: Answers): Promise<void> {
    return oraPromise(async (spinner: Ora) => {
        spinner.text = "Setting up the project's meta";

        await handleAllFiles(answers);
        await handlePackageJson(answers);
        await handleComposerJson(answers);

        spinner.succeed();
    });
}

async function handleAllFiles(answers: Answers): Promise<void> {
    const hanldeFiles = (targetPath: string): void => {
        const entries = fs.readdirSync(targetPath, { withFileTypes: true });

        entries.forEach((entry) => {
            const srcPath = path.join(targetPath, entry.name);

            if (entry.isDirectory()) {
                hanldeFiles(srcPath);

                return;
            }

            const content = fs.readFileSync(srcPath, 'utf-8').replace(/{project-name}/g, answers.name);

            fs.writeFileSync(srcPath, content);
        });
    };

    hanldeFiles(paths.target);
}

async function handlePackageJson(answers: Answers): Promise<void> {
    await setMeta(`${paths.target}/package.json`, answers);
}

async function handleComposerJson(answers: Answers): Promise<void> {
    if (!answers.template.includes('laravel')) {
        return;
    }

    await setMeta(`${paths.target}/composer.json`, answers);
}

async function setMeta(targetPath: string, answers: Answers): Promise<void> {
    const meta = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

    if (answers.description?.trim().length) {
        meta.description = answers.description.trim();
    }

    if (answers.keywords?.length) {
        meta.keywords = answers.keywords;
    }

    if (!meta.description) {
        delete meta.description;
    }

    if (!meta.keywords) {
        delete meta.keywords;
    }

    fs.writeFileSync(targetPath, JSON.stringify(meta, null, 4));
}

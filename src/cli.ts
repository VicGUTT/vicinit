#! /usr/bin/env node

import fs from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import { Answers, AnswersRaw } from './types';
import paths from './paths.js';
import duplicateTemplateToTarget from './steps/duplicateTemplateToTarget.js';
import setProjectMeta from './steps/setProjectMeta.js';
import setupProject from './steps/setupProject.js';
import installDependencies from './steps/installDependencies.js';
import strSlug from './utils/strSlug.js';
import commitGit from './steps/commitGit.js';
import setupGit from './steps/setupGit.js';

const templates = fs.readdirSync(paths.templates);

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter a name (required) :',
        validate(value: string) {
            if (value.trim().length) {
                return true;
            }

            return 'Please enter a valid name for your project.';
        },
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a description :',
        default() {
            return null;
        },
    },
    {
        type: 'input',
        name: 'keywords',
        message: 'Please provide a couple keywords (comma separated list) :',
        default() {
            return null;
        },
    },
    {
        type: 'list',
        name: 'template',
        message: 'Please choose a template (required) :',
        choices: templates,
    },
];

ora().info('Please ensure you have already created and changed into the directory that will host your new project.');
process.stdout.write('\n');

inquirer.prompt(questions).then(async (raw: AnswersRaw) => {
    const answers: Answers = {
        ...raw,
        name: strSlug(raw.name),
        keywords: raw.keywords
            ? raw.keywords
                  .split(',')
                  .filter(Boolean)
                  .map((value: string) => value.trim())
            : null,
    };

    process.stdout.write('\n');

    await duplicateTemplateToTarget(answers);
    process.stdout.write('\n');

    await setProjectMeta(answers);
    process.stdout.write('\n');

    await setupProject(answers);
    process.stdout.write('\n');

    await setupGit();
    process.stdout.write('\n');

    await installDependencies(answers);
    process.stdout.write('\n');

    await commitGit('feat: installed dependencies');
});

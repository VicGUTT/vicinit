#! /usr/bin/env node

import type { Answers, AnswersRaw } from './types/index.js';
import fs from 'node:fs';
import inquirer, { type QuestionCollection } from 'inquirer';
import str from '@vicgutt/strjs';
import projects from './Projects/index.js';
import paths from './utils/paths.js';
import cmd from './utils/cmd.js';

const templates = fs.readdirSync(paths.templates);

const questions: QuestionCollection = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter a name (required) :',
        default() {
            return str.basename(process.cwd());
        },
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

cmd.info('Please ensure you have already created and changed into the directory that will host your new project.');
cmd.line();

inquirer.prompt<AnswersRaw>(questions).then(async (raw: AnswersRaw) => {
    const answers: Answers = {
        ...raw,
        keywords: raw.keywords
            ? raw.keywords
                  .split(',')
                  .filter(Boolean)
                  .map((value: string) => value.trim())
            : null,
    };

    const Project = projects[str.studly(answers.template) as keyof typeof projects];

    if (!Project) {
        return;
    }

    return Project.handle(answers);
});

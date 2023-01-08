import type Project from '../Projects/Project.js';

export type Paths = {
    root: string;
    target: string;
    templates: string;
};
export type AnswersRaw = {
    name: string;
    description: string | null;
    keywords: string | null;
    template: string;
};
export type Answers = {
    name: AnswersRaw['name'];
    description: AnswersRaw['description'];
    keywords: string[] | null;
    template: AnswersRaw['template'];
};

export type ProjectStep = (answers: Answers) => Promise<void>;
// @see https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-construct-signatures
export type DerivedProject = new () => Project;

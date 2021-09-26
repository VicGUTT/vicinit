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

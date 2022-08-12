import { type ProjectStep, type Answers, type DerivedProject } from '../types';
import cmd from '../utils/cmd.js';

export default abstract class Project {
    // public abstract init(): void;
    public abstract steps(): ProjectStep[];

    public static async handle(answers: Answers): Promise<void> {
        cmd.line();

        for (const step of new (this as unknown as DerivedProject)().steps()) {
            await step(answers);

            cmd.line();
        }
    }
}

import { type ProjectStep, type Answers, type DerivedProject } from '../types';
import cmd from '../utils/cmd.js';

export default abstract class Project {
    // public abstract init(): void;
    public abstract steps(): ProjectStep[];

    public static async handle(answers: Answers): Promise<void> {
        cmd.line();

        const instance = new (this as unknown as DerivedProject)();
        
        for (const step of instance.steps()) {
            await step.bind(instance)(answers);

            cmd.line();
        }
    }
}

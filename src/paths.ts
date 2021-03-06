import path from 'path';
import { Paths } from './types';

const dirname = import.meta.url.replace('file:///', '');
const paths: Paths = {
    root: path.resolve(`${dirname}/../..`),
    get target(): string {
        return this.root !== process.cwd() ? process.cwd() : `${process.cwd()}/.temp`;
    },
    get templates(): string {
        return `${this.root}/templates`;
    },
};

export default paths;

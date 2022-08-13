import fs from 'fs';
import path from 'path';
import replaceInFile from './replaceInFile.js';
import promisify from './promisify.js';

export default function replaceInDirectory(dirPath: string, replacements: Record<string, string>): Promise<void> {
    return promisify(() => {
        const excludes = ['.git', 'vendor', 'node_modules'];
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        entries.forEach((entry) => {
            if (excludes.includes(entry.name)) {
                return;
            }

            const srcPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                replaceInDirectory(srcPath, replacements);

                return;
            }

            replaceInFile(srcPath, replacements);
        });
    });
}

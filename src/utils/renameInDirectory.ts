import fs from 'node:fs';
import path from 'node:path';
import str from '@vicgutt/strjs';
import renameFile from './renameFile.js';
import promisify from './promisify.js';

export default function renameInDirectory(dirPath: string, replacements: Record<string, string>): Promise<void> {
    return promisify(() => {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        entries.forEach((entry) => {
            const srcPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                renameInDirectory(srcPath, replacements);

                return;
            }

            const fileName = str.basename(srcPath, path.extname(srcPath));
            const replacementKey = Object.keys(replacements).find((key) => fileName.includes(key));
            const replacementValue = !replacementKey
                ? null
                : fileName.replace(replacementKey, replacements[replacementKey]);

            if (!replacementValue) {
                return;
            }

            renameFile(srcPath, replacementValue);
        });
    });
}

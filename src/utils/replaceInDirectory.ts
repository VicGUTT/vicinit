import fs from 'fs';
import path from 'path';
import replaceInFile from './replaceInFile.js';

export default function replaceInDirectory(dirPath: string, replacements: Record<string, string>): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
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

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

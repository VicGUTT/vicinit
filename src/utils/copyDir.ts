import fs from 'node:fs';
import path from 'node:path';
import promisify from './promisify.js';

export default async function copyDir(src: string, dest: string): Promise<void> {
    return promisify(() => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const entries = fs.readdirSync(src, { withFileTypes: true });

        entries.forEach((entry) => {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
        });
    });
}

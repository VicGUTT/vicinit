import fs from 'fs';
import path from 'path';

async function copyDir(src: string, dest: string): Promise<void> {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    entries.forEach((entry) => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    });
}

export default copyDir;

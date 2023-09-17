import fs from 'node:fs';
import str from '@vicgutt/strjs';

export default function replaceInFile(filePath: string, replacements: Record<string, string>): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const replaced = str.replaceMany(Object.keys(replacements), Object.values(replacements), content) as string;

    fs.writeFileSync(filePath, replaced);
}

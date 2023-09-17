import fs from 'node:fs';
import path from 'node:path';

export default function renameFile(oldFileFullPath: string, newNameWithoutPathOrExtension: string): void {
    fs.renameSync(
        oldFileFullPath,
        `${path.dirname(oldFileFullPath)}/${newNameWithoutPathOrExtension}${path.extname(oldFileFullPath)}`
    );
}

import fs from 'fs';
import path from 'path';

export default function renameFile(oldFileFullPath: string, newNameWithoutPathOrExtension: string): void {
    fs.renameSync(
        oldFileFullPath,
        `${path.dirname(oldFileFullPath)}/${newNameWithoutPathOrExtension}${path.extname(oldFileFullPath)}`
    );
}

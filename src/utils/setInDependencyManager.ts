import fs from 'fs';
import is from '@vicgutt/isjs';
import promisify from './promisify.js';

export default function setInDependencyManager(filePath: string, values: Record<string, unknown>): Promise<void> {
    return promisify(() => {
        const meta = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        Object.entries(values).forEach(([key, value]) => {
            value = sanitize(value);

            if (is.empty(value)) {
                delete meta[key];

                return;
            }

            meta[key] = value;
        });

        fs.writeFileSync(filePath, JSON.stringify(meta, null, 4));
    });
}

function sanitize(value: unknown): unknown {
    if (is.string(value)) {
        return value.trim();
    }

    if (is.array(value)) {
        return value.map((val) => sanitize(val));
    }

    return value;
}

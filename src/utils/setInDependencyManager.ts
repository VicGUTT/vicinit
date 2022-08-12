import fs from 'fs';
import is from '@vicgutt/isjs';

export default function setInDependencyManager(filePath: string, values: Record<string, unknown>): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
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

            resolve();
        } catch (error) {
            reject(error);
        }
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

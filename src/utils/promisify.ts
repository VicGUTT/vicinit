export default function promisify<T>(resolve: () => T): Promise<T> {
    return new Promise((_resolve, _reject) => {
        try {
            _resolve(resolve());
        } catch (error) {
            _reject(error);
        }
    });
}

import { type Ora, oraPromise } from 'ora';

export default function action<T>(
    text: string,
    callback: (spinner: Ora) => PromiseLike<T>,
    options?: Parameters<typeof oraPromise>[1]
) {
    return oraPromise(async (spinner: Ora) => {
        spinner.text = text;

        const result = await callback(spinner);

        spinner.succeed();

        return result;
    }, options);
}

import type { App as Config } from '@/types/configs/app.js';

// type Flash = {
//     success?: string;
//     info?: string;
//     warning?: string;
//     error?: string;
// };

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = {
    data: T;
    app: Config /* & {
        //
    } */;
    // auth?: {
    //     authenticated?: boolean;
    //     user?: boolean;
    //     organization?: boolean;
    // };
    head: {
        title?: string | null;
        description?: string | null;
    };
    // meta: {
    //     // links?: {
    //     //     //
    //     // };
    //     // redirect?: {
    //     //     //
    //     // };
    //     // authorizations?: {
    //     //     //
    //     // };
    //     // flash?: Flash[];
    // };
};

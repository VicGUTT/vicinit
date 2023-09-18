import type { createInertiaApp } from '@inertiajs/vue3';

export type CreateInertiaAppProps = Parameters<typeof createInertiaApp>[0];

export type CreateInertiaAppPropsOptions = {
    asSsr: boolean;
};

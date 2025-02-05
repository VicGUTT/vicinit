import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import setupAxios from '@/helpers/setup/setupAxios.js';
import setupInertiaEvents from '@/helpers/setup/setupInertiaEvents.js';
import createInertiaAppProps from '@/helpers/setup/createInertiaAppProps.js';

setupAxios();
setupInertiaEvents();

createServer((page) => {
    return createInertiaApp({
        page,
        render: renderToString,
        ...createInertiaAppProps({ asSsr: true }),
    });
});

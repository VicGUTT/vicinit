import type { Head, Link } from '@inertiajs/vue3';
import type route from '@/types/route.js';
import type routesConfig from '@/assets/static/routes-config.json';

declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof route<(typeof routesConfig)['routes']>;
    }
}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        'o-head': typeof Head;
        'o-link': typeof Link;
    }
}

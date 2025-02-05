import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { Head, Link } from '@inertiajs/vue3';
import type { RouteList as ZiggyRouteList, route } from 'ziggy-js';
import type { PageProps as AppPageProps } from '@/types/Page/PageProps.js';
import type routesConfig from '@/assets/static/routes-config.js';

type _RouteList = (typeof routesConfig)['routes'];

declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof route;
    }
}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        'o-head': typeof Head;
        'o-link': typeof Link;
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

declare module 'ziggy-js' {
    interface RouteList extends ZiggyRouteList, _RouteList {}
}

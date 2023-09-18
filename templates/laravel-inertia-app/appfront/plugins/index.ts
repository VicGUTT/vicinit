import { type App } from 'vue';
// @ts-expect-error shush
import { ZiggyVue } from 'ziggy';
import routesConfig from '@/assets/static/routes-config.json';

export default [
    [ZiggyVue, routesConfig],
    //
] satisfies Parameters<App['use']>[];

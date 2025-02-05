import type { App } from 'vue';
import { type Config, ZiggyVue } from 'ziggy-js';
import routesConfig from '@/assets/static/routes-config.js';

export default [
    [ZiggyVue, routesConfig as Partial<Config>],
    //
] as Parameters<App['use']>[];

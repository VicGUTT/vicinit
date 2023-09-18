import { type App, type DefineComponent, createSSRApp, h } from 'vue';
import type { CreateInertiaAppProps, CreateInertiaAppPropsOptions } from '@/types/helpers/setup.js';
import plugins from '@/plugins/index.js';
import components from '@/views/components/global.js';
import app from '@/helpers/app.js';

const appName = app().name;

export default function createInertiaAppProps(options: CreateInertiaAppPropsOptions): CreateInertiaAppProps {
    return {
        title: (title: string) => (appName && title ? `${title} | ${appName}` : title || appName),
        async resolve(name) {
            const pages = import.meta.glob<DefineComponent>('../../views/pages/**/*.vue');
            const page = (await pages[`../../views/pages/${name}.vue`]()).default;

            if (!page.layout) {
                page.layout = (await import('@/views/layouts/default.vue')).default as DefineComponent;
            }

            return page;
        },
        setup({ el, App, props, plugin }) {
            const vueApp = createSSRApp({ render: () => h(App, props) }).use(plugin);

            registerPlugins(vueApp);
            registerComponents(vueApp);

            if (options.asSsr) {
                return vueApp;
            }

            vueApp.mount(el);

            el.removeAttribute('data-page');

            if (import.meta.env.DEV && app().hasDebugModeEnabled()) {
                // @ts-expect-error shush
                window[`$app-${(Math.random() + '').slice(2)}`] = {
                    configs: {
                        app: app(),
                    },
                    inertia: {
                        el,
                        App,
                        props,
                        plugin,
                    },
                    vue: vueApp,
                    $props: props.initialPage.props,
                };
            }

            return vueApp;
        },
        progress: {
            color: 'hsl(var(--primary-600))',
        },
    };
}

function registerPlugins(vueApp: App): void {
    plugins.forEach((args) => {
        vueApp.use(...args);
    });
}

function registerComponents(vueApp: App): void {
    Object.entries(components).forEach(([componentName, component]) => {
        vueApp.component(componentName, component);
    });
}

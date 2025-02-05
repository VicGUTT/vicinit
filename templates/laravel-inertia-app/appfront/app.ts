import { createInertiaApp } from '@inertiajs/vue3';
import setupAxios from '@/helpers/setup/setupAxios.js';
import setupInertiaEvents from '@/helpers/setup/setupInertiaEvents.js';
import createInertiaAppProps from '@/helpers/setup/createInertiaAppProps.js';

import '@/app.css';

setupAxios();
setupInertiaEvents();

createInertiaApp(createInertiaAppProps({ asSsr: false }));

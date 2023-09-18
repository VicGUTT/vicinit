import { createInertiaApp } from '@inertiajs/vue3';
import setupAxios from '@/helpers/setup/setupAxios.js';
import createInertiaAppProps from '@/helpers/setup/createInertiaAppProps.js';

import '@/app.css';

setupAxios();
createInertiaApp(createInertiaAppProps({ asSsr: false }));

import type { App } from 'vue';
import { Head, Link } from '@inertiajs/vue3';

export default {
    'o-head': Head,
    'o-link': Link,
} satisfies Record<Parameters<App['component']>[0], Parameters<App['component']>[1]>;

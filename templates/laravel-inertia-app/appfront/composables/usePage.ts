import type { PageProps } from '@/types/Page/PageProps.js';
import { usePage as useInertiaPage } from '@inertiajs/vue3';

export default function usePage<Props extends PageProps>() {
    return useInertiaPage<Props>();
}

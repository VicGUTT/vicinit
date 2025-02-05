import { router } from '@inertiajs/vue3';
import app from '@/helpers/app.js';

export default function setupInertiaEvents(): void {
    router.on('navigate', (event) => {
        app().refreshConfig(event.detail.page.props.app);
    });
}

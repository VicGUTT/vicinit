<script lang="ts" setup>
import type { PageProps } from '@/types/Page/PageProps.js';
import { usePage } from '@inertiajs/vue3';

defineOptions({
    name: 'o-layout-default',
});

const page = usePage<PageProps<Record<string, unknown>>>();
</script>

<template>
    <o-head>
        <title v-if="page.props.head?.title">{{ page.props.head.title }}</title>
        <meta v-if="page.props.head?.description" name="description" :content="page.props.head.description" />
    </o-head>

    <main class="min-h-screen grid place-items-center" style="min-block-size: 100dvb">
        <slot />
    </main>
</template>

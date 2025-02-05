<script lang="ts" setup>
import type { HomePageProps } from '@/types/Page/HomePageProps.js';
import { onMounted } from 'vue';
import useRoute from '@/composables/useRoute.js';
import usePage from '@/composables/usePage.js';

defineOptions({
    name: 'o-page-home',
});

const route = useRoute();
const page = usePage<HomePageProps>();

onMounted(() => {
    console.log('Home: mounted!');
    console.log(route('home'));
});
</script>

<template>
    <header>
        <h1 class="text-7xl">Home!</h1>
        <p class="mt-2 text-2xl opacity-70">{{ route('home') }}</p>
        <p class="mt-2 text-2xl opacity-70">{{ page.props.data.random }}</p>
    </header>
</template>

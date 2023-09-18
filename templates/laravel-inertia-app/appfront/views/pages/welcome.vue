<template>
    <o-head title="Welcome" />

    <header>
        <h1 class="h1">Welcome!</h1>
        <p class="mt-2 text-2xl opacity-70">{{ route('welcome') }}</p>
    </header>
</template>

<script lang="ts" setup>
import useRoute from '@/composables/useRoute.js';

const route = useRoute();

console.log(route('welcome'));
</script>

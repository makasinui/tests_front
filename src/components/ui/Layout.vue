<template>
    <HeaderVue />
    <main class="bg-main-bg h-full">
        <slot></slot>
    </main>
</template>

<script lang="ts" setup>
import HeaderVue from './HeaderVue.vue';
</script>

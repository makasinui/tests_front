<template>
    <HeaderVue />
    <main class="bg-main-bg min-h-screen">
        <slot></slot>
    </main>
</template>

<script lang="ts" setup>
import HeaderVue from './HeaderVue.vue';
</script>

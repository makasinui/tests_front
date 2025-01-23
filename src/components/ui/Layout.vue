<template>
    <HeaderVue />
    <main class="px-4 pt-24">
        <slot></slot>
    </main>
</template>

<script lang="ts" setup>
import HeaderVue from './HeaderVue.vue';
</script>

<template>
    <header class="header">
        <BurgerMenu @click="onOpen" />
        <Icon
            icon="qlementine-icons:user-16"
            color="gray"
            width="48"
            height="48" />
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BurgerMenu from './BurgerMenu.vue';

const isOpen = ref(false);

const onOpen = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style>
.header {
    @apply h-16 gap-4 flex items-center fixed z-10 w-full justify-between border-b border-gray-500 px-2 bg-white;
}
</style>
<template>
    <header class="h-16 gap-4 flex items-center fixed w-full justify-between border-b border-gray-500 px-2">
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

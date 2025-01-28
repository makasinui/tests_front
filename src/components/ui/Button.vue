<template>
    <button 
        class="button"
        :style="size"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface IProps {
    small: boolean
}

const props = defineProps<IProps>();

const size = computed(() => {
    const style = {
        padding: '8px 24px',
        fontSize: '18px'
    }
    
    if(props.small) {
        style.padding = '4px 8px';
        style.fontSize = '14px';
    }

    return style;
})
</script>

<style>
.button {
    @apply flex items-center justify-center font-bold bg-button text-white rounded-lg;
    @apply transition-all duration-200;
}
.button:active {
    @apply scale-[.85];
}
</style>
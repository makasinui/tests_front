<template>
    <div v-if="error" class="text-sm text-center text-red-700">
        {{ error }}
    </div>
</template>

<script lang="ts" setup>
interface IProps {
    error?: string
}

defineProps<IProps>();
</script>
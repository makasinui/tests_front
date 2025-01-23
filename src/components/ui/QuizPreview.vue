<template>
    <div class="quiz-preview">
        <img
            :src="card?.img"
            :alt="card.title" 
            class="w-20 h-20 rounded-full object-cover"
        />
        <span class="text-md text-[#5e5d73]">{{ card.title }}</span>
    </div>
</template>

<script lang="ts" setup>
interface IProps {
    card: {
        img?: string;
        title: string;
    };
}

defineProps<IProps>();
</script>

<style>
.quiz-preview {
    @apply w-full h-[100px] flex gap-6 rounded-md bg-white items-center px-6;
}
</style>

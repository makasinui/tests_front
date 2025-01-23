<template>
    <Title>Тесты онлайн</Title>
    <div class="mt-4">
        <Select
            placeholder="Категории"
            :items="mockCategories" />
    </div>
    <div class="mt-6">
        <QuizPreview
            v-for="card in quizes"
            :card="card"
            :key="card.id" 
        />
    </div>
</template>

<script lang="ts" setup>
import { httpGetQuizes } from '@/api/quiz/quiz.api';
import QuizPreview from '@/components/ui/QuizPreview.vue';
import type { Quiz } from '@/types';
import { onMounted, ref } from 'vue';

const mockCategories = [
    {
        id: 1,
        name: 'Custom...',
    },
    {
        id: 2,
        name: 'Custom...',
    },
];

const quizes = ref<Quiz.IItem[]>();

const fetch = async () => {
    const data = await httpGetQuizes();
    quizes.value = data;
};

onMounted(async () => {
    await fetch();
});
</script>

<template>
    <Title>Тесты онлайн</Title>
    <div class="mt-4">
        <Select
            placeholder="Категории"
            :items="mockCategories" />
    </div>
    <div class="mt-6"></div>
</template>

<script lang="ts" setup>
import { httpGetQuizes } from '@/api/quiz/quiz.api';
import { onMounted } from 'vue';

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

const fetch = async () => {
    const data = await httpGetQuizes();
    console.log(data);
};

onMounted(async () => {
    await fetch();
});
</script>

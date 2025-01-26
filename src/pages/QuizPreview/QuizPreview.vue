<template>
    <section class="h-full bg-quiz px-4 pt-20">
        <Spinner v-if="isLoading && quiz?.id" />
        <div
            class="h-full w-full"
            v-else>
            <router-link to="/">
                <Icon
                    class="ml-auto"
                    icon="entypo:cross" />
            </router-link>
            <img
                :src="quiz?.img"
                :alt="quiz?.title"
                class="w-32 h-32 mx-auto rounded-full object-cover" />
            <h1 class="text-center pt-6">{{ quiz?.title }}</h1>
            <p class="text-center">{{ quiz?.subtitle }}</p>
            <router-link :to="`/quiz/${id}/start`">
                <Button class="mx-auto mt-4">Начать</Button>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { httpGetQuiz } from '@/api/quiz/quiz.api';
import type { Quiz } from '@/types';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params as { id: string };

const isLoading = ref(false);
const quiz = ref<Quiz.IItem>();

const fetch = async () => {
    isLoading.value = true;
    quiz.value = await httpGetQuiz(id);
    isLoading.value = false;
};

onMounted(async () => {
    await fetch();
});
</script>

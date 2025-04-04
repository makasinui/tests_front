<template>
    <section class="bg-main-bg min-h-full pt-20 pb-6 px-4">
        <Title class="text-center">Создание опроса</Title>
        <div class="flex flex-col gap-4 h-full">
            <QuizForm />
            <div>
                <Title class="text-center">Вопросы</Title>
                <div class="pt-4">
                    <Questions 
                        :questions="form.questions"
                        :result="form.result"
                        @add-result="onAddResult"
                    />
                    <AddQuestion @add-question="onAddQuestion" class="mt-4" />
                </div>
            </div>
            <div class="flex justify-center gap-4 mb-auto h-full">
                <Button @click="onCreateQuiz">Создать</Button>
                <RouterLink to="/">
                    <Button>Назад</Button>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import Questions from '@/components/quizes/questions/Questions.vue';
import AddQuestion from '@/components/quizes/questions/AddQuestion.vue';

import { useQuizStore } from '@/store/quizStore';
import { useCreateQuiz } from './composables';
import QuizForm from '@/components/quizes/QuizForm.vue';

const quizStore = useQuizStore();

const { form } = storeToRefs(quizStore);
const { onAddQuestion, onAddResult } = quizStore;

const {
    onCreateQuiz
} = useCreateQuiz(form);
</script>
<template>
    <section class="bg-main-bg min-h-full pt-20 pb-6 px-4">
        <Title class="text-center">Создание опроса</Title>
        <div class="flex flex-col gap-4 h-full">
            <div class="flex flex-col gap-2">
                <Input 
                    v-model="form.name"
                    label="Название"
                    placeholder="Название опроса"
                    :error="v$.name.$errors"
                    required
                />
            </div>
            <div class="flex flex-col gap-2">
                <Input 
                    v-model="form.description"
                    label="Краткое описание"
                    placeholder="Краткое описание"
                    :error="v$.description.$errors"
                />
            </div>
            <div class="flex flex-col gap-2">
                <FileUpload 
                    v-model="form.img"
                    label="Изображение"
                />
            </div>
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

import { type Result } from '@/types';

import Questions from '@/components/quizes/questions/Questions.vue';
import AddQuestion from '@/components/quizes/questions/AddQuestion.vue';

import { useQuestionStore } from '@/store/questionStore';
import { useCreateQuiz } from './composables';

const questionStore = useQuestionStore();

const { form } = storeToRefs(questionStore);
const { onAddQuestion, onAddResult } = questionStore;

const {
    v$,
    onCreateQuiz
} = useCreateQuiz(form);
</script>
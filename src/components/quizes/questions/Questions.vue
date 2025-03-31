<template>
    <TransitionGroup tag="div" name="list" class="flex flex-col gap-6">
        <div
            v-for="(question, i) in localQuestions"
            :key="i"
        >
            <div class="flex flex-col gap-2 bg-secondary px-2 py-4 relative">
                <div class="flex justify-between">
                    <span class="text-base">Вопрос {{ i + 1 }}</span>
                    <Button
                        small
                        class="max-w-[50%] ml-auto"
                        @click="onAddAnswer(i)"
                    >
                        Добавить изображение
                    </Button>
                    <input type="file" class="hidden">
                </div>
                <Icon
                    icon="entypo:cross"
                    class="bg-red-600 rounded-md absolute -right-2 -top-2 text-white"
                    @click="onDeleteQuestion(i)"
                />
                <Input
                    class="w-full"
                    placeholder="Название вопроса"
                    v-model="question.name"
                />
                <AnswerList 
                    :answers="question.answers"
                    :question-idx="i"
                    @delete-answer="onDeleteAnswer"
                    @add-result="onAddResult"
                />
                <Button
                    small
                    class="mt-2"
                    @click="onAddAnswer(i)"
                >
                    Добавить ответ
                </Button>
                <div class="mt-2">
                    <QuestionSettings :question="question" />
                </div>
            </div>
        </div>
    </TransitionGroup>
    <Modal :show="isOpen" @on-close="isOpen = false"  />
</template>

<script lang="ts" setup>
import type { Questions } from '@/types';
import AnswerList from '../answer/AnswerList.vue';
import { ref } from 'vue';
import QuestionSettings from './QuestionSettings.vue';

interface IProps {
    questions: Questions.IItemCreated[];
}

const props = defineProps<IProps>();

const localQuestions = props.questions;
const isOpen = ref(false);

const onAddAnswer = (idx: number) => {
    const answers = localQuestions[idx].answers;

    answers.push({
        name: '',
    });
};

const onAddResult = (questionIdx: number, answerIdx: number) => {
    localQuestions[questionIdx].answers[answerIdx].result = [];
}

const onDeleteAnswer = (questionIdx: number, answerIdx: number) => {
    localQuestions[questionIdx].answers?.splice(answerIdx, 1);
};

const onDeleteQuestion = (questionIdx: number) => {
    localQuestions.splice(questionIdx, 1)
}
</script>
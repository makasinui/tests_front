<template>
    <TransitionGroup tag="div" name="list" class="flex flex-col gap-6">
        <div
            v-for="(question, i) in localQuestions"
            :key="i"
        >
            <div class="flex flex-col gap-2 bg-secondary px-2 py-4 relative">
                <Icon
                    v-if="i !== 0"
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
                />
                <Button
                    small
                    class="mt-2"
                    @click="onAddAnswer(i)"
                >
                    Добавить ответ
                </Button>
            </div>
        </div>
    </TransitionGroup>
</template>

<script lang="ts" setup>
import type { Questions } from '@/types';
import AnswerList from '../answer/AnswerList.vue';

interface IProps {
    questions: Questions.IItemCreated[];
}

const props = defineProps<IProps>();

const localQuestions = props.questions;

const onAddAnswer = (idx: number) => {
    const answers = localQuestions[idx].answers;

    answers.push({
        name: '',
    });
};

const onDeleteAnswer = (questionIdx: number, answerIdx: number) => {
    localQuestions[questionIdx].answers?.splice(answerIdx, 1);
};

const onDeleteQuestion = (questionIdx: number) => {
    localQuestions.splice(questionIdx, 1)
}
</script>
<template>
    <div
        v-for="(question, i) in localQuestions"
        :key="i">
        <div class="flex flex-col gap-2 bg-secondary px-2 py-4">
            <Input
                class="w-full"
                placeholder="Название вопроса"
                v-model="question.name" 
            />
            <TransitionGroup
                name="list"
                tag="div"
            >
                <div
                    v-for="(item, idx) in question.answers"
                    :key="idx"
                    class="flex w-full"
                >
                    <div class="flex w-full gap-4">
                        <div class="flex pt-4 gap-2">
                            <span class="whitespace-nowrap text-sm">Ответ {{ idx + 1 }}</span>
                            <Icon
                                icon="entypo:cross"
                                class="bg-red-600 rounded-md text-white"
                                @click="onDeleteAnswer(i, idx)"
                            />
                        </div>
                        <div class="w-full flex flex-col min-w-0">
                            <Input class="w-full" v-model="item.name" />
                            <div class="flex gap-1 pt-1">
                                <Icon icon="entypo:plus" />
                                <span class="text-xs"> добавить результат </span>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
            <Button
                small
                class="mt-2"
                @click="onAddAnswer(i)"
            >
                Добавить ответ
            </Button>
        </div>
        <AddQuestion class="mt-4" />
    </div>
</template>

<script lang="ts" setup>
import type { Questions } from '@/types';

import AddQuestion from '@/components/quizes/AddQuestion.vue';

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
    console.log(answerIdx, localQuestions[questionIdx].answers)
    localQuestions[questionIdx].answers?.splice(answerIdx, 1);
    console.log(answerIdx, localQuestions[questionIdx].answers)
};
</script>

<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>

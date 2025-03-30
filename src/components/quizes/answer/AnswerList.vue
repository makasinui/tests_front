<template>
    <TransitionGroup
        name="list"
        tag="div">
        <div
            class="flex w-full"
            v-for="(item, idx) in answers"
            :key="idx">
            <div class="flex w-full gap-4">
                <div class="flex pt-4 gap-2">
                    <span class="whitespace-nowrap text-sm">Ответ {{ idx + 1 }}</span>
                    <Icon
                        icon="entypo:cross"
                        class="bg-red-600 rounded-md text-white"
                        @click="onDeleteAnswer(idx)" />
                </div>
                <div class="w-full flex flex-col min-w-0">
                    <Input
                        class="w-full"
                        v-model="item.name" />
                    <div class="flex gap-1 pt-1">
                        <Icon icon="entypo:plus" />
                        <span class="text-xs"> добавить результат </span>
                    </div>
                </div>
            </div>
        </div>
    </TransitionGroup>
</template>

<script lang="ts" setup>
import type { Answers } from '@/types';

interface IProps {
    answers: Answers.IItemCreated[];
    questionIdx: number;
}

type TEmits = {
    deleteAnswer: [questionIdx: number, answerIdx: number];
};

const emit = defineEmits<TEmits>();
const props = defineProps<IProps>();

const onDeleteAnswer = (idx: number) => emit('deleteAnswer', props.questionIdx, idx);
</script>
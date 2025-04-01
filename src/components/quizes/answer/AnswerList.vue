<template>
    <TransitionGroup
        name="list"
        tag="div"
    >
        <div
            class="flex w-full"
            v-for="(item, idx) in answers"
            :key="idx"
        >
            <div class="flex w-full gap-4">
                <div class="flex pt-4 gap-2">
                    <span class="whitespace-nowrap text-sm">Ответ {{ idx + 1 }}</span>
                    <Icon
                        icon="entypo:cross"
                        class="bg-red-600 rounded-md text-white"
                        @click="onDeleteAnswer(idx)"
                    />
                </div>
                <div class="w-full flex flex-col min-w-0">
                    <ValidateEach
                        :state="item"
                        :rules="rules"
                    >
                        <template #default="{ v }">
                            <Input
                                class="w-full"
                                v-model="v.name.$model"
                                :error="v.name.$errors"
                                max="255"
                            />
                        </template>
                    </ValidateEach>
                    <div
                        class="flex gap-1 pt-1"
                        @click="onAddResult(idx)"
                    >
                        <Icon icon="entypo:plus" />
                        <span class="text-xs"> добавить результат </span>
                    </div>
                </div>
            </div>
        </div>
    </TransitionGroup>
</template>

<script lang="ts" setup>
import { MIN_LENTH, REQUIRED } from '@/consts';
import type { Answers } from '@/types';
import { ValidateEach } from '@vuelidate/components';
import { helpers, minLength, required } from '@vuelidate/validators';

interface IProps {
    answers: Answers.IItemCreated[];
    questionIdx: number;
}

type TEmits = {
    deleteAnswer: [questionIdx: number, answerIdx: number];
    addResult: [questionIdx: number, answerIdx: number];
};

const emit = defineEmits<TEmits>();
const props = defineProps<IProps>();

const rules = {
    name: {
        required: helpers.withMessage(REQUIRED, required),
        minLength: helpers.withMessage(MIN_LENTH(3), minLength(3)),
    },
};

const onDeleteAnswer = (idx: number) => emit('deleteAnswer', props.questionIdx, idx);
const onAddResult = (idx: number) => emit('addResult', props.questionIdx, idx);
</script>

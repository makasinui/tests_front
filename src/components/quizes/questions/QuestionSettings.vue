<template>
    <Checkbox
        v-model="question.isImage"
        small
        v-if="isChoiceType"
        class="pl-0 gap-0"
        label="Ответы в виде изображений"
        label-class-name="text-[10px] pl-2" 
    />
    <Checkbox
        v-model="question.isTimeLimit"
        small
        class="pl-0 gap-0"
        label="Ограничение времени"
        label-class-name="text-[10px] pl-2" 
    />
    <Input
        v-if="question.isTimeLimit"
        v-model="question.timeLimit"
        type="time" 
    />
    <Checkbox
        v-model="question.multiply"
        v-if="isChoiceType"
        small
        class="pl-0 gap-0"
        label="Несколько ответов"
        label-class-name="text-[10px] pl-2" 
    />
</template>

<script lang="ts" setup>
import { Questions } from '@/types';

interface IProps {
    question: Questions.IItemCreated
}

const props = defineProps<IProps>()

const isChoiceType = props.question.type === Questions.EType.CHOICE;
</script>
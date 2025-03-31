<template>
    <TransitionGroup tag="div" name="list" class="flex flex-col gap-6">
        <div
            v-for="(question, i) in localQuestions"
            :key="i"
        >
            <div class="flex flex-col gap-2 bg-secondary px-2 py-4 relative">
                <div class="flex justify-between">
                    <span class="text-base">Вопрос {{ i + 1 }}</span>
                </div>
                <FileUpload v-model="question.img" />
                <Icon
                    icon="entypo:cross"
                    class="bg-red-600 rounded-md absolute -right-2 -top-2 text-white"
                    @click="onDeleteQuestion(i)"
                />
                <Input
                    class="w-full"
                    placeholder="Название вопроса"
                    v-model="question.name"
                    max="55"
                />
                <AnswerList
                    v-if="isChoiceType(question)"
                    :answers="question.answers"
                    :question-idx="i"
                    @delete-answer="onDeleteAnswer"
                    @add-result="onAddResult"
                />
                <Button
                    v-if="isChoiceType(question)"
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
import { Questions } from '@/types';
import AnswerList from '../answer/AnswerList.vue';
import QuestionSettings from './QuestionSettings.vue';
import { useQuestion } from './composables';

interface IProps {
    questions: Questions.IItemCreated[];
}

const props = defineProps<IProps>();

const {
    localQuestions,
    isOpen,
    isChoiceType,
    onAddAnswer,
    onAddResult,
    onDeleteAnswer,
    onDeleteQuestion
} = useQuestion(props.questions)

</script>
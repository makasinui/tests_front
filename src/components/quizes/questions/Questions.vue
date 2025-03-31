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
                        @click="onAddImage"
                        :disabled="imagePreview"
                    >
                        {{ imageTitle }}
                    </Button>
                    <input 
                        type="file" 
                        ref="fileRef" 
                        class="hidden"
                        @change="(ev) => onAddFile(ev, i)"
                    >
                </div>
                <div class="flex items-center gap-2">
                    <img 
                        class="max-w-[200px] max-h-[200px] object-cover" 
                        v-if="imagePreview" 
                        :src="imagePreview"
                    >
                    <Button
                        small
                        v-if="imagePreview"
                        @click="onDeleteImage"
                    >
                        Удалить изображение
                    </Button>
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
import { computed, ref, useTemplateRef } from 'vue';
import QuestionSettings from './QuestionSettings.vue';
import { httpPostFile } from '@/api/file/file.api';

interface IProps {
    questions: Questions.IItemCreated[];
}

const props = defineProps<IProps>();

const localQuestions = props.questions;
const isOpen = ref(false);
const fileRef = useTemplateRef<HTMLInputElement[]>('fileRef');
const fileName = ref("");

const imageTitle = computed(() => {
    if(fileName.value) {
        return fileName.value
    }

    return 'Добавить изображение'
});

const imagePreview = computed(() => {
    if(!fileName.value) return
    return URL.createObjectURL(fileRef.value?.[0]?.files?.[0] as File)
});

const isChoiceType = (question: Questions.IItemCreated) => question.type === Questions.EType.CHOICE;

const onAddAnswer = (idx: number) => {
    const answers = localQuestions[idx].answers;

    answers.push({
        name: '',
    });
};

const onAddResult = (questionIdx: number, answerIdx: number) => {
    localQuestions[questionIdx].answers[answerIdx].result = [];
}

const onAddImage = () => {
    fileRef.value?.[0]?.click();
}

const onAddFile = async (ev: Event, questionIdx: number) => {
    if(!ev.target) return
    const target = (ev.target as HTMLInputElement);
    if(!target?.files?.[0]) return

    fileName.value = target.files[0].name;
    const data = await httpPostFile(target.files[0]);
    localQuestions[questionIdx].img = data.id
}

const onDeleteImage = () => {
    if(fileRef.value?.[0]) {

        fileRef.value[0].files = null;
        fileName.value = '';
        fileRef.value[0].value = ''
    }
}

const onDeleteAnswer = (questionIdx: number, answerIdx: number) => {
    localQuestions[questionIdx].answers?.splice(answerIdx, 1);
};

const onDeleteQuestion = (questionIdx: number) => {
    localQuestions.splice(questionIdx, 1)
}
</script>
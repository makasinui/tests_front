<template>
    <TransitionGroup
        tag="div"
        name="list"
        class="flex flex-col gap-6"
    >
        <div
            v-for="(question, i) in questions"
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
                <ValidateEach
                    :state="question"
                    :rules="rules"
                >
                    <template #default="{ v }">
                        <Input
                            class="w-full"
                            placeholder="Название вопроса"
                            v-model="v.name.$model"
                            :error="v.name.$errors"
                            max="55"
                        />
                    </template>
                </ValidateEach>
                <template v-if="isChoiceType(question)">
                    <AnswerList
                        :answers="question.answers"
                        :question-idx="i"
                        @delete-answer="onDeleteAnswer"
                        @add-result="onAddResultModal"
                    />
                    <Button
                        small
                        class="mt-2"
                        @click="onAddAnswer(i)"
                    >
                        Добавить ответ
                    </Button>
                </template>
                <div class="mt-2">
                    <QuestionSettings :question="question" />
                </div>
            </div>
        </div>
    </TransitionGroup>
    <Modal
        :show="isOpen"
        @on-close="isOpen = false"
    >
        <div
            class="flex flex-col gap-4 h-full"
            v-if="!result?.length"
        >
            <span class="text-xl text-center">Добавить результат</span>
            <div class="h-full">
                <ValidateEach :state="resultForm" :rules="rules">
                    <template #default="{ v }">
                        <Input
                            label="Наименование"
                            v-model="v.name.$model"
                            :error="v.name.$errors"
                        />
                    </template>
                </ValidateEach>
                <FileUpload
                    class="mt-4"
                    label="Изображение"
                    v-model="resultForm.img"
                />
            </div>
            <Button @click="onAddResult">Сохранить</Button>
        </div>
        <div v-else>
            <span class="text-xl text-center">Выбрать результат</span>
            <Checkbox
                v-for="item in result"
                :key="item.name"
                :label="item.name"
                small
                :checked="hasResultInAnswer(item.id)"
                @click="onChangeResult(item.id)"
                class="pl-0 pt-2 text-sm gap-0"
            />
            <div class="flex justify-center mt-4 gap-2">
                <Button @click="isOpen = false">Добавить</Button>
                <Button @click="isOpen = false">Закрыть</Button>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { type Result } from '@/types';
import AnswerList from '../answer/AnswerList.vue';
import QuestionSettings from './QuestionSettings.vue';
import { useQuestion } from './composables';
import { ValidateEach } from '@vuelidate/components';
import { useQuizStore } from '@/store/quizStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';


type TEmits = {
    addResult: [result: Result.IITemCreated];
};

const quizStore = useQuizStore();

const { form } = storeToRefs(quizStore);
const { 
    onAddAnswer,
    onDeleteAnswer,
    onDeleteQuestion
} = quizStore;
const questions = ref(form.value.questions);
const result = ref(form.value.result);

const emit = defineEmits<TEmits>();

const {
    isOpen,
    rules,
    hasResultInAnswer,
    resultForm,
    isChoiceType,
    onAddResultModal,
    onAddResult,
    onChangeResult
} = useQuestion({questions: questions.value, emit, result: result.value});
</script>

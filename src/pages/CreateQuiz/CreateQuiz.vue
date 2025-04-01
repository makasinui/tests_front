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
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import { Questions as QuestionsType, type Quiz, type Result } from '@/types';

import Questions from '@/components/quizes/questions/Questions.vue';
import { MIN_LENTH, REQUIRED } from '@/consts';
import AddQuestion from '@/components/quizes/questions/AddQuestion.vue';
import { httpPostQuiz } from '@/api/quiz/quiz.api';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive<Quiz.IItemCreated>({
    name: '',
    description: '',
    img: '',
    questions: [],
    result: []
});

const rules = computed(() => ({
    name: {
        required: helpers.withMessage(REQUIRED, required),
        minLength: helpers.withMessage(MIN_LENTH(3), minLength(3)),
    },
    description: {
        minLength: helpers.withMessage(MIN_LENTH(1), minLength(1))
    }
}))

const v$ = useVuelidate(rules, form as { name: string; description: string }, { $autoDirty: true });

const onAddQuestion = (type: QuestionsType.EType) => {
    //@ts-ignore
    form.questions.push({
        name: '',
        optional: false,
        type,
        isImage: false,
        isTimeLimit: false,
        multiply: false,
        answers: [
            {
                name: '',
                result: []
            }
        ]
    })
};

const onAddResult = (result: Result.IITemCreated) => {
    console.log(result, 'asdasdasdasdas')
    form.result.push(result);
}

const onCreateQuiz = async () => {
    const isValidForm = await v$.value.$validate();
    if(!isValidForm || !form.questions?.length) return
    try {
        await httpPostQuiz(form);
        router.push('/')
    } catch(err) {
        console.error(err);
    }
}
</script>
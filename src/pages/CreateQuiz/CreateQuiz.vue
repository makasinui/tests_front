<template>
    <section class="bg-main-bg h-full pt-20 px-4">
        <Title class="text-center">Создание опроса</Title>
        <div class="flex flex-col gap-4">
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
            <div>
                <Title class="text-center">Вопросы</Title>
                <div class="pt-4">
                    <Questions 
                        :questions="form.questions" 
                    />
                    <AddQuestion @add-question="onAddQuestion" class="mt-4" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import { Questions as QuestionsType } from '@/types';

import Questions from '@/components/quizes/questions/Questions.vue';
import { MIN_LENTH } from '@/consts';
import AddQuestion from '@/components/quizes/questions/AddQuestion.vue';

const form = reactive({
    name: '',
    description: '',
    questions: [{
        name: '',
        optional: false,
        type: QuestionsType.EType.CHOICE,
        answers: [
            {
                name: '',
            }
        ]
    }]
});

const rules = computed(() => ({
    name: {
        required,
        minLength: helpers.withMessage(MIN_LENTH(3), minLength(3)),
    },
    description: {
        minLength: helpers.withMessage(MIN_LENTH(1), minLength(1))
    }
}))

const v$ = useVuelidate(rules, form, { $autoDirty: true });

const onAddQuestion = (type: QuestionsType.EType) => {
    form.questions.push({
        name: '',
        optional: false,
        type,
        answers: [
            {
                name: '',
            }
        ]
    })
}
</script>
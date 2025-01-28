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
                <AddQuestion />
                <div class="pt-4">
                    <Questions 
                        :questions="form.questions" 
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

import AddQuestion from '@/components/quizes/AddQuestion.vue';
import Questions from '@/components/quizes/Questions.vue';

const form = reactive({
    name: '',
    description: '',
    questions: []
});

const rules = computed(() => ({
    name: {
        required,
        minLength: minLength(3)
    },
    description: {
        minLength: minLength(1)
    }
}))

const v$ = useVuelidate(rules, form, { $autoDirty: true });
</script>
<template>
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
</template>

<script lang="ts" setup>
import { useCreateQuiz } from '@/pages/CreateQuiz/composables';
import { useQuizStore } from '@/store/quizStore';
import { storeToRefs } from 'pinia';

const quizStore = useQuizStore();

const { form } = storeToRefs(quizStore);

const { v$ } = useCreateQuiz(form);
</script>

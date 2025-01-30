<template>
    <div v-for="(question, i) in questions" :key="i">
        <div class="flex flex-col gap-2 bg-secondary px-2 py-4">
            <Input 
                class="w-full" 
                placeholder="Название вопроса" 
                v-model="question.name" 
            />
            <div class="">

            </div>
        </div>
        <AddQuestion class="mt-4" />
    </div>
</template>

<script lang="ts" setup>
import type { Questions } from '@/types';

import AddQuestion from '@/components/quizes/AddQuestion.vue';

interface IProps {
    questions: Questions.IItemCreated[]
}

defineProps<IProps>();
</script>
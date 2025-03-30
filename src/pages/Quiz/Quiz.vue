<template>
    <div class="pt-20 bg-quiz h-full">
        <Spinner v-if="isLoading && !currentStep?.id" />
        <div
            v-if="!isLoading && currentStep?.id && !isComplete"
            class="flex flex-col gap-6 h-full">
            <h2 class="text-center text-2xl font-bold">{{ currentStep?.name }}</h2>
            <QuizAnswer
                v-if="answers?.length"
                :type="currentStep?.type"
                :answers="answers"
                @change="setQuestionAnswer" />
            <ErrorField :error="error" />
            <Button
                @click="onNextStep"
                class="mx-4"
                >Следующий шаг</Button
            >
        </div>
        <div v-if="isComplete">
            DONE!!
            {{ finalResult }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { httpGetAnswers } from '@/api/answers/answers.api';
import { httpGetQuestions } from '@/api/questions/questions.api';
import QuizAnswer from '@/components/quizes/answer/QuizAnswer.vue';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuiz } from './composable';

const route = useRoute();
const { id } = route.params as { id: string };

const { 
    step, 
    isLoading, 
    questions, 
    answers, 
    error, 
    currentStep, 
    isComplete,
    finalResult,
    setQuestionAnswer, 
    onNextStep,
} = useQuiz();

const fetch = async () => {
    isLoading.value = true;
    questions.value = await httpGetQuestions(id);
    answers.value = await httpGetAnswers(questions.value[0]?.id);
    isLoading.value = false;
};

onMounted(async () => {
    await fetch();
});

watch(step, async () => {
    if (currentStep?.value?.id) {
        isLoading.value = true;
        answers.value = await httpGetAnswers(currentStep.value.id);
        isLoading.value = false;
    }
});
</script>

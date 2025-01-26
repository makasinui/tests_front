<template>
    <div class="pt-20 bg-quiz h-full">
        <Spinner v-if="isLoading && !currentStep?.id" />
        <div v-if="!isLoading && currentStep?.id" class="flex flex-col gap-6 h-full">
            <h2 class="text-center text-xl">{{ currentStep?.name }}</h2>
            <QuizAnswer 
                v-if="answers?.length"
                :type="currentStep?.type" 
                :answers="answers" 
            />
            <Button @click="onNextStep" class="mx-4">Следующий шаг</Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { httpGetAnswers } from '@/api/answers/answers.api';
import { httpGetQeustions } from '@/api/questions/questions.api';
import QuizAnswer from '@/components/quizes/QuizAnswer.vue';
import type { Answers, Questions } from '@/types';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params as { id: string };
const step = ref(0);

const isLoading = ref(false);
const questions = ref<Questions.IItem[]>();
const answers = ref<Answers.IItem[]>();

const fetch = async () => {
    isLoading.value = true;
    questions.value = await httpGetQeustions(id);
    answers.value = await httpGetAnswers(questions.value[0]?.id);
    isLoading.value = false;
};

const currentStep = computed(() => questions.value?.[step.value] ?? null)

const onNextStep = () => {
    step.value = step.value + 1;
}

onMounted(async () => {
    await fetch();
});

watch(step, async () => {
    if(currentStep?.value?.id) {
        isLoading.value = true;
        answers.value = await httpGetAnswers(currentStep.value.id)
        isLoading.value = false;
    }
})
</script>
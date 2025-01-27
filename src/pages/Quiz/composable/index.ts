import type { Answers, Questions } from '@/types';
import { computed, ref } from 'vue';

export const useQuiz = () => {
    const step = ref(0);

    const isLoading = ref(false);
    const questions = ref<Questions.IItem[]>();
    const answers = ref<Answers.IItemFiltered[]>();
    const error = ref('');

    const stepAndAnswer = ref<Questions.IQuestionStep[]>([]);

    const setQuestionAnswer = (id: number, val: boolean | string) => {
        const stepIdx = stepAndAnswer.value.findIndex((item) => item?.step === step.value);

        if (typeof val === 'string') {
            if (stepIdx !== -1) {
                stepAndAnswer.value[stepIdx].answer = val;
            } else {
                stepAndAnswer.value.push({ step: step.value, answer: val });
            }

            return;
        }

        if (!val) {
            stepAndAnswer.value = stepAndAnswer.value.filter((item) => item?.step !== step.value);
            return;
        }

        if (stepIdx !== -1) {
            stepAndAnswer.value[stepIdx].id = id;
        } else {
            stepAndAnswer.value.push({ step: step.value, id });
        }

        error.value = '';
    };

    const currentStep = computed(() => questions.value?.[step.value] ?? null);

    const onNextStep = () => {
        const currentAnswer = stepAndAnswer.value.find((item) => item?.step === step.value);
        if (!currentAnswer?.id && !currentStep.value?.optional) {
            error.value = 'Выберите ответ';
            return;
        }
        step.value = step.value + 1;
    };

    return {
        step,
        isLoading,
        questions,
        answers,
        error,
        stepAndAnswer,
        setQuestionAnswer,
        currentStep,
        onNextStep
    };
};

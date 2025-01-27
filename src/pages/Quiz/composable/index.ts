import type { Answers, Questions } from '@/types';
import { computed, ref } from 'vue';

export const useQuiz = () => {
    const step = ref(0);

    const isLoading = ref(false);
    const isComplete = ref(false);
    const questions = ref<Questions.IItem[]>();
    const answers = ref<Answers.IItemFiltered[]>();
    const error = ref('');

    const stepAndAnswer = ref<Questions.IQuestionStep[]>([]);

    const finalResult = ref('');

    const setQuestionAnswer = (id: number, val: boolean | string, result?: string[]) => {
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
            stepAndAnswer.value[stepIdx].result = [...result!];
        } else {
            stepAndAnswer.value.push({ step: step.value, id, result: [...result!]});
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

        if(questions.value?.length === step.value) {
            isComplete.value = true;
            getFinallyResult();
        }
    };
    
    const getFinallyResult = () => {
        const allResults = stepAndAnswer.value.flatMap(item => item.result as string[]);
        const countOfResult = allResults.reduce((acc, el) => {
            //@ts-ignore
            acc[el] = (acc[el] || 0) + 1;
            return acc
        }, {});

        //@ts-ignore
        finalResult.value = Object.keys(countOfResult).sort((a, b) => countOfResult[b] - countOfResult[a])[0];
    }

    return {
        step,
        isLoading,
        questions,
        answers,
        error,
        stepAndAnswer,
        currentStep,
        isComplete,
        finalResult,
        setQuestionAnswer,
        onNextStep,
        getFinallyResult
    };
};

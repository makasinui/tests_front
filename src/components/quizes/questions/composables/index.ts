import { MIN_LENTH, REQUIRED } from '@/consts';
import { Questions, type Result } from '@/types';
import useVuelidate from '@vuelidate/core';
import { helpers, required, minLength } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';

interface IProps {
    questions: Questions.IItemCreated[];
    emit: (evt: 'addResult', result: Result.IITemCreated) => void;
    result: Result.IITemCreated[]
}

export const useQuestion = ({ questions, emit, result }: IProps) => {
    const localQuestions = questions;
    const isOpen = ref(false);
    const currentResultToAdd = ref();
    const resultForm = reactive({
        name: '',
        img: null,
    });
    const v = useVuelidate();

    const rules = {
        name: {
            required: helpers.withMessage(REQUIRED, required),
            minLength: helpers.withMessage(MIN_LENTH(3), minLength(3)),
        },
    };

    const isChoiceType = (question: Questions.IItemCreated) => question.type === Questions.EType.CHOICE;

    const hasResultInAnswer = (id: number) => {
        if(!currentResultToAdd.value?.result?.length) {
            return false
        }
        const { questionIdx, answerIdx } = currentResultToAdd.value;
        const currentResult = localQuestions[questionIdx].answers[answerIdx].result;
        return currentResult?.some(item => item.id === id)
    }

    const onChangeResult = (id: number) => {
        const { questionIdx, answerIdx } = currentResultToAdd.value;
        if(hasResultInAnswer(id)) {
            localQuestions[questionIdx].answers[answerIdx].result.filter(item => item.id !== id);
            currentResultToAdd.value.result = localQuestions[questionIdx].answers[answerIdx].result; 
            return;
        }

        const findedItem = result.find(item => item.id === id);

        if(!findedItem?.id) {
            return
        }

        localQuestions[questionIdx].answers[answerIdx].result.push(findedItem);
        currentResultToAdd.value.result = localQuestions[questionIdx].answers[answerIdx].result;
    }

    const onAddAnswer = (idx: number) => {
        const answers = localQuestions[idx].answers;

        answers.push({
            name: '',
            result: []
        });
    };

    const onAddResultModal = (questionIdx: number, answerIdx: number) => {
        isOpen.value = true;
        currentResultToAdd.value = {
            result: localQuestions[questionIdx].answers[answerIdx].result ?? [],
            questionIdx,
            answerIdx,
        };
    };

    const onAddResult = () => {
        const { name, img } = resultForm;
        const { questionIdx, answerIdx } = currentResultToAdd.value;
        const id = currentResultToAdd.value.result?.length ? currentResultToAdd.value.result.at(-1)?.id : 0; 

        currentResultToAdd.value.result.push({
            name,
            img,
            id
        });
        

        localQuestions[questionIdx].answers[answerIdx].result.push({name, img: img ?? undefined, id});
        emit('addResult', {name, img: img ?? undefined, id});
    };

    const onDeleteAnswer = (questionIdx: number, answerIdx: number) => {
        localQuestions[questionIdx].answers?.splice(answerIdx, 1);
    };

    const onDeleteQuestion = (questionIdx: number) => {
        localQuestions.splice(questionIdx, 1);
    };

    return {
        localQuestions,
        isOpen,
        v,
        rules,
        currentResultToAdd,
        resultForm,
        hasResultInAnswer,
        isChoiceType,
        onAddAnswer,
        onAddResult,
        onAddResultModal,
        onDeleteAnswer,
        onChangeResult,
        onDeleteQuestion,
    };
};

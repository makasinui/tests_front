import { MIN_LENTH, REQUIRED } from '@/consts';
import { Questions, type Result } from '@/types';
import useVuelidate from '@vuelidate/core';
import { helpers, required, minLength } from '@vuelidate/validators';
import { reactive, ref } from 'vue';

interface IProps {
    questions: Questions.IItemCreated[];
    result: Result.IITemCreated[];
    onAddResultToStore: (result: Result.IITemCreated) => void
}

export const useQuestion = ({ questions, onAddResultToStore, result }: IProps) => {
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
        const currentResult = questions[questionIdx].answers[answerIdx].result;
        return currentResult?.some(item => item.id === id)
    }

    const onChangeResult = (id: number) => {
        const { questionIdx, answerIdx } = currentResultToAdd.value;
        if(hasResultInAnswer(id)) {
            questions[questionIdx].answers[answerIdx].result.filter(item => item.id !== id);
            currentResultToAdd.value.result = questions[questionIdx].answers[answerIdx].result; 
            return;
        }

        const findedItem = result.find(item => item.id === id);

        if(!findedItem?.id) {
            return
        }

        questions[questionIdx].answers[answerIdx].result.push(findedItem);
        currentResultToAdd.value.result = questions[questionIdx].answers[answerIdx].result;
    }

    const onAddResultModal = (questionIdx: number, answerIdx: number) => {
        isOpen.value = true;
        currentResultToAdd.value = {
            result: questions[questionIdx].answers[answerIdx].result ?? [],
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
        

        questions[questionIdx].answers[answerIdx].result.push({name, img: img ?? undefined, id});
        onAddResultToStore({name, img: img ?? undefined, id});
    };

    return {
        isOpen,
        v,
        rules,
        currentResultToAdd,
        resultForm,
        hasResultInAnswer,
        isChoiceType,
        onAddResult,
        onAddResultModal,
        onChangeResult,
    };
};

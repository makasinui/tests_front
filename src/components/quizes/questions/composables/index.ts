import { Questions } from "@/types";
import { ref } from "vue";

export const useQuestion = (questions: Questions.IItemCreated[]) => {
    const localQuestions = questions;
    const isOpen = ref(false);

    const isChoiceType = (question: Questions.IItemCreated) => question.type === Questions.EType.CHOICE;

    const onAddAnswer = (idx: number) => {
        const answers = localQuestions[idx].answers;

        answers.push({
            name: '',
        });
    };

    const onAddResult = (questionIdx: number, answerIdx: number) => {
        localQuestions[questionIdx].answers[answerIdx].result = [];
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
        isChoiceType,
        onAddAnswer,
        onAddResult,
        onDeleteAnswer,
        onDeleteQuestion
    }
};

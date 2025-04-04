import type { Questions, Quiz, Result } from '@/types';
import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useQuizStore = defineStore('quizStore', () => {
    const form = reactive<Quiz.IItemCreated>({
        name: '',
        description: '',
        img: '',
        questions: [],
        result: []
    });

    const onAddQuestion = (type: Questions.EType) => {
        //@ts-ignore
        form.questions.push({
            name: '',
            optional: false,
            type,
            isImage: false,
            isTimeLimit: false,
            multiply: false,
            answers: [
                {
                    name: '',
                    result: []
                }
            ]
        })
    };

    const onAddResult = (result: Result.IITemCreated) => {
        form.result.push(result);
    }

    const onAddAnswer = (idx: number) => {
        const answers = form.questions[idx].answers;

        answers.push({
            name: '',
            result: []
        });
    };

    const onDeleteAnswer = (questionIdx: number, answerIdx: number) => {
        form.questions[questionIdx].answers?.splice(answerIdx, 1);
    };

    const onDeleteQuestion = (questionIdx: number) => {
        form.questions.splice(questionIdx, 1);
    };

    return {
        form,
        onAddQuestion,
        onAddResult,
        onAddAnswer,
        onDeleteAnswer,
        onDeleteQuestion
    }
});
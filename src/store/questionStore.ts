import type { Questions, Quiz, Result } from '@/types';
import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useQuestionStore = defineStore('questionStore', () => {
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

    return {
        form,
        onAddQuestion,
        onAddResult
    }
});
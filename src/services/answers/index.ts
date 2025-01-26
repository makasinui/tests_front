import type { Answers } from '@/types';

export const adapterAnswersFromBackend = (answers: Answers.IItem[]) => {
    return answers.map((item) => ({
        ...item,
        checked: false,
    }));
};

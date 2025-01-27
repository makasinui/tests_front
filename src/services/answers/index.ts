import type { Answers } from '@/types';

export const adapterAnswersFromBackend = (answers: Answers.IItem[]) => {
    return answers.map((item) => ({
        ...item,
        resultsFiltered: item.results?.map(({name}) => name) as string[],
        checked: false,
    }));
};

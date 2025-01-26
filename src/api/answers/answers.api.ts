import type { Answers } from "@/types";
import axios from "axios";
import { url } from "..";
import { adapterAnswersFromBackend } from "@/services";

export const httpGetAnswers = async (questionId: number | string): Promise<Answers.IItemFiltered[]> => {
    const { data } = await axios.get<Answers.IItem[]>(`${url}/answers/?questionId=${questionId}`);

    return adapterAnswersFromBackend(data);
}
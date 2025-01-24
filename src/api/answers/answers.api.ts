import type { Answers } from "@/types";
import axios from "axios";
import { url } from "..";

export const httpGetAnswers = async (questionId: number | string): Promise<Answers.IItem[]> => {
    const { data } = await axios.get<Answers.IItem[]>(`${url}/answers/?questionId=${questionId}`);

    return data;
}
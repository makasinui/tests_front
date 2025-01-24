import type { Questions } from "@/types";
import axios from "axios";
import { url } from "..";

export const httpGetQeustions = async (quizId: number | string): Promise<Questions.IItem[]> => {
    const { data } = await axios.get<Questions.IItem[]>(`${url}/questions/?quizId=${quizId}`);

    return data;
}
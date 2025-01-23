import type { Quiz } from "@/types";
import axios from "axios";
import { url } from "..";

export const httpGetQuizes = async (): Promise<Quiz.IItem[]> => {
    const { data } = await axios.get<Quiz.IBackItem>(`${url}/quizes`);

    return data.rows;
}
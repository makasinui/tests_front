import axios from "axios";
import { url } from "..";
import type { Files } from "@/types";

export const httpGetFile = async (id: string) => {
    const { data } = await axios.get(`${url}/files/${id}`, {
        responseType: 'blob'
    });

    return URL.createObjectURL(data);
};

export const httpPostFile = async (file: File): Promise<Files.IFile> => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axios.post(`${url}/files/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}
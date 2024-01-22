import { REACT_APP_BACKEND_URL } from "environmentVariables";
import axios from "../axios";
import { Video } from "./types";

const usersUrl = `${REACT_APP_BACKEND_URL}/video`;

export const getAllVideos = async (accessToken: string): Promise<Video[]> => {
    try {
        const { data } = await axios.get<Video[]>(
            `${usersUrl}/`,
            {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
                },
            },
        );

        return data;
    } catch (error) {
        handleError(error);
    }
};

export const getOneVideo = async (accessToken: string, id: string): Promise<Video> => {
    try {
        const { data } = await axios.get<Video>(
            `${usersUrl}/${id}`,
            {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
                },
            },
        );

        return data;
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error(error.response.data.message);
        }
    
        if (error.response.status !== 200) {
            throw new Error("Some error occurred");
        }
    }
};

export const deleteOneVideo = async (accessToken: string, id: string): Promise<void> => {
    try {
        const { data, status } = await axios.delete<void>(
            `${usersUrl}/${id}`,
            {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
                },
            },
        );

        return;
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error(error.response.data.message);
        }
    
        if (error.response.status !== 200) {
            throw new Error("Some error occurred");
        }
    }
};

export const UploadVideo = async (videoFile: File, title: string, description: string, accessToken): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", videoFile);

        const { data, status } = await axios.post<any>(
            `${usersUrl}/upload`,
            formData,
            {
                headers: {
                  "Authorization": `Bearer ${accessToken}`,
                },
            },
        );

        return data.message;
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error(error.response.data.message);
        }
    
        if (error.response.status !== 200) {
            throw new Error("Some error occurred");
        }
    }
};

const handleError = (error) => {
    const { response: { status, data }} = error;
    if (status === 400) {
        throw new Error(data.message);
    }

    if (status !== 200) {
        throw new Error("Some error occurred");
    }
}
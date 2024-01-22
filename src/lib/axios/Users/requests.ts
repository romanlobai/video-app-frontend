import { REACT_APP_BACKEND_URL } from "environmentVariables";
import axios, { handleError } from "../axios";
import { AccessToken } from "./types";

const usersUrl = `${REACT_APP_BACKEND_URL}/user`;

export const login = async (email: string, password: string): Promise<string> => {
    try {
        const { data } = await axios.post<AccessToken>(
            `${usersUrl}/login`,
            {
                email,
                password
            }
        );

        return data.accessToken;
    } catch (error) {
        handleError(error);
    }
};

export const registration = async (email: string, password: string): Promise<string> => {
    try {
        const { data } = await axios.post<AccessToken>(
            `${usersUrl}/registration`,
            {
                email,
                password
            }
        );

        return data.accessToken;
    } catch (error) {
        handleError(error);
    }
};

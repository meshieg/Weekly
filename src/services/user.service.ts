import { AxiosInstance } from "../config/axios";
import { IUser, IUserResponse } from "../utils/types";

const userPrefix = `${process.env.REACT_APP_BACKEND_URL}/user`;

export class UserService {
    static logIn = async (email: string, password: string): Promise<IUserResponse> => {
        const url = userPrefix + "/logIn";
        return await AxiosInstance.post(url, {
            params: {
                email, password
            }
        })
            .then(res => {
                return res.data;
            })
    }

    static register = async (user: IUser): Promise<IUserResponse> => {
        const url = userPrefix + "/register";
        return await AxiosInstance.post(url, { user })
            .then(res => {
                return res.data
            })
    }
}
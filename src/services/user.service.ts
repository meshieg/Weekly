import { AxiosInstance } from "../config/axios";
import { IUser, IUserResponse } from "../utils/types";
import { IInputs } from "../pages/PersonalData/RegisterFields";

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

    static updateUser = async (user: IUser, generateAlgo: boolean): Promise<IInputs> => {
        return await AxiosInstance.put(userPrefix, { user, generateAlgo })
            .then(res => {
                return res.data;
            })
    }

    static sendEmail = async (email: string): Promise<IUser> => {
        const url = userPrefix + "/resetPassword";
        return await AxiosInstance.post(url, {
            params: {
                email
            }
        })
        .then(res => {
            return res.data.user;
        })
    }

    static validateToken = async (userId: number, resetToken: string) => {
        const url = userPrefix + "/validateToken";
        return await AxiosInstance.post(url, {
            params: {
                id: userId, resetToken
            }
        })
        .then(res => {
            return res.data;
        })
    }

    static updatePassword = async (id: number, password: string): Promise<IUserResponse> => {
        const url = userPrefix + "/updatePassword";
        return await AxiosInstance.put(url, {
            params: {
                id, password
            }
        })
        .then(res => {
            return res.data;
        })
    }

    // static logInGoogle = async (user: IUser): Promise<IUserResponse> => {
    //     const url = userPrefix + "/logInGoogle";
    //     return await AxiosInstance.post(url, { user })
    //     .then(res => {
    //         return res.data
    //     })
    // }
}
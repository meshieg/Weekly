import axios from "axios";
import { IUser, IUserResponse } from "../utils/types";

const userPrefix = `${process.env.REACT_APP_BACKEND_URL}/user`;

export class UserService {
    static logIn = async (email: string, password: string): Promise<IUserResponse> => {
        const url = userPrefix + "/logIn";
        return await axios.post(url, {
            params: {
                email, password
            }
        })
        .then(res => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static register = async (user: IUser): Promise<IUserResponse> => {
        const url = userPrefix + "/register";
        return await axios.post(url, { user })
            .then(res => {
                return res.data
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
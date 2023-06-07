import { AxiosInstance } from "../config/axios";
import { IUser, IUserResponse } from "../utils/types";
import { IInputs } from "../pages/PersonalData/PersonalDataFields";

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

    static getCurrentUser = async (): Promise<IInputs> => {
        // const url = userPrefix;
        // return await axios.get(url)
        //     .then(res => {
        //         return res.data
        //     })

        const user: IInputs = {
            // id: 1,
            firstName: "Omer",
            lastName: "Damari",
            email: "email@gmail.com",
            password: "123456",
            beginDayHour: new Date(0, 0, 0, 0),
            endDayHour: new Date(0, 0, 0, 0)
        };
        return user;
    }
}
import axios from "axios";
import { ITaskEntity } from "../utils/types";

const taskPrefix = `${process.env.REACT_APP_BACKEND_URL}/task`;

export class TaskService {
    static saveTask = async (task: ITaskEntity): Promise<ITaskEntity | void> => {
        const url = taskPrefix;
        return axios
            .post(url, { ...task })
            .then((res) => {
                console.log("task saved succesfully");
                return (res.data as ITaskEntity)
            })
            .catch((err) => {
                throw err;
            });
    }
}
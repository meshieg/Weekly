import axios from "axios";
import { ITaskEntity } from "../utils/types";

const schedulePrefix = `${process.env.REACT_APP_BACKEND_URL}/schedule`;

export class ScheduleService {
    static getSchedule = async (): Promise<ITaskEntity[]> => {
        const url = schedulePrefix;
        return await axios.get(url)
            .then(res => {
                return res.data.map((task: ITaskEntity) => {
                    return {
                        ...task
                    } as ITaskEntity;
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
import axios from "axios";
import { IScheduleEntity } from "../utils/types";

const schedulePrefix = `${process.env.REACT_APP_BACKEND_URL}/schedule/week`;

export class ScheduleService {
    static getSchedule = async (minDate: Date, maxDate: Date): Promise<IScheduleEntity[]> => {
        const url = schedulePrefix;
        return await axios.get(url, {
            params: {
                minDate, maxDate
            }
        })
            .then(res => {
                return res.data.map((scheduleEntity: IScheduleEntity) => {
                    return {
                        ...scheduleEntity
                    } as IScheduleEntity;
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static generateSchedule = async (tasks: ITask[]): Promise<IScheduleEntity[] | void> => {
        const url = schedulePrefix;
        return axios.post(url, {tasks})
        .then(res => {
            console.log("Schedule generated successfully");
            console.log(res.data);
            // return res.data.map((scheduleEntity: IScheduleEntity) => {
            //     return {
            //         ...scheduleEntity
            //     } as IScheduleEntity;
            // })
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
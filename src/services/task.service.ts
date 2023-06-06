import axios from "axios";
// import { ITaskEntity } from "../utils/types";

const taskPrefix = `${process.env.REACT_APP_BACKEND_URL}/task`;

export class TaskService {
  static getTaskById = async (taskId: number): Promise<ITask | void> => {
    const url = `${taskPrefix}/getOne/${taskId}`;
    return axios
      .get(url)
      .then((res) => {
        console.log("data: " + res);
        return res.data as ITask;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static saveTask = async (task: ITask): Promise<ITask | void> => {
    const taskJson = JSON.stringify({
      ...task,
      dueDate: task.dueDate.toISOString(),
    });

    const url = taskPrefix;
    return axios
      .post(url, taskJson)
      .then((res) => {
        console.log("task saved successfully");
        return res.data as ITask;
      })
      .catch((err) => {
        throw err;
      });
  };

  static updateTask = async (updatedTask: ITask): Promise<ITask | void> => {
    const url = `${taskPrefix}/${updatedTask.id}`;
    return axios
      .put(url, {
        task: updatedTask,
      })
      .then((res) => {
        return res.data as ITask;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static getAllTasks = async (): Promise<ITask[]> => {
    const url = `${taskPrefix}/all`;
    return await axios
      .get(url)
      .then((res) => {
        return res.data.map((task: ITask) => {
          return {
            ...task,
            dueDate: new Date(task.dueDate),
            assignment: task.assignment && new Date(task.assignment),
          } as ITask;
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static setDone = async (taskId: number): Promise<ITask | void> => {
    const url = `${taskPrefix}/setdone/${taskId}`;
    return axios
      .put(url)
      .then((res) => {
        return {
          ...res.data,
          dueDate: new Date(res.data.dueDate),
          assignment: res.data.assignment && new Date(res.data.assignment),
        } as ITask;
      })
      .catch((err) => {
        throw err;
      });
  };

  static deleteTask = async (taskId: number) => {
    const url = `${taskPrefix}/delete/${taskId}`;
    return axios
      .put(url)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };
}

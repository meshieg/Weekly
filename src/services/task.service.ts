import { AxiosInstance } from "../config/axios";

const taskPrefix = `${process.env.REACT_APP_BACKEND_URL}/task`;

export class TaskService {
  // static saveTask = async (task: ITask): Promise<ITask | void> => {
  //   const taskJson = JSON.stringify({
  //     ...task,
  //     dueDate: task.dueDate.toISOString(),
  //   });

  //   const url = taskPrefix;
  //   return axios
  //     .post(url, taskJson)
  //     .then((res) => {
  //       console.log("task saved successfully");
  //       return res.data as ITask;
  //     })
  //     .catch((err) => {
  //       // throw err;
  //     });
  // };

  static updateTask = async (updatedTask: ITask): Promise<ITask | void> => {
    const url = `${taskPrefix}/${updatedTask.id}`;
    return AxiosInstance
      .put(url, {
        task: updatedTask,
      })
      .then((res) => {
        return {
          ...res.data,
          dueDate: new Date(res.data?.dueDate),
          assignment: res.data?.assignment && new Date(res.data?.assignment),
        } as ITask;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static getAllTasks = async (): Promise<ITask[]> => {
    const url = `${taskPrefix}/all`;
    return await AxiosInstance.get(url)
      .then(res => {
        console.log(res.data)
        return res.data.map((task: ITask) => {
          return {
            ...task,
            dueDate: new Date(task.dueDate),
            assignment: task.assignment && new Date(task.assignment)
          } as ITask;
        })
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static setDone = async (taskId: number): Promise<ITask | void> => {
    const url = `${taskPrefix}/setdone/${taskId}`;;
    return AxiosInstance
      .put(url)
      .then((res) => {
        console.log("task updated successfully");
        return {
          ...res.data,
          dueDate: new Date(res.data.dueDate),
          assignment: res.data.assignment && new Date(res.data.assignment)
        } as ITask;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

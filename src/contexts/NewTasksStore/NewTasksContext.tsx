import { createContext, useContext } from "react";

interface INewTasksContext {
    newTasks: ITask[];
    addTask: (newTask: ITask) => void;
    removeTask: (taskId: number) => void;
}

const defaultValues: INewTasksContext = {
    newTasks: [],
    addTask: (newTask: ITask) => {},
    removeTask: (taskId: number) => {},
}

export const NewTasksContext = createContext(defaultValues);
export const useNewTasksContext = (): INewTasksContext => useContext(NewTasksContext);

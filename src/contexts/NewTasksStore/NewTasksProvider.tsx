import { useState } from "react";
import { NewTasksContext } from "./NewTasksContext";

interface IProps {
  children: React.ReactNode;
}

export const NewTasksProvider: React.FC<IProps> = ({ children }) => {
    const [newTasks, setNewTasks] = useState<ITask[]>([]);
    const [id, setId] = useState<number>(0);
  
    const addTask = (newTask: ITask) => {
      newTask.id = id;
      setNewTasks(prevArray => [...prevArray, newTask]);
      setId(id+1);
  }
  
  const removeTask = (taskId: number) => {
    const tasksCopy = newTasks.filter(task => task.id !== taskId);
    setNewTasks(tasksCopy);
  }

  const refreshTasks = () => {
    setNewTasks([]);
  }
  
  return (
    <NewTasksContext.Provider
      value={{
        newTasks,
        addTask,
        removeTask,
        refreshTasks
      }}
    >{children}</NewTasksContext.Provider>
  )};
  
  export default NewTasksContext;

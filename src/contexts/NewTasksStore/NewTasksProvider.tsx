import { useState } from "react";
import { NewTasksContext } from "./NewTasksContext";

export const NewTasksProvider: React.FC = () => {
    const [newTasks, setNewTasks] = useState<ITask[]>([]);
  
    const addTask = (task: ITask) => {
      console.log("task added");
  }
  
  const removeTask = (taskId: number) => {
      console.log("task deleted");
  }
  
    return (
      <NewTasksContext.Provider
        value={{
          newTasks,
          addTask,
          removeTask
        }}
      />
    );
  };
  
  export default NewTasksContext;

import React from "react";
import { ITask } from "../../utils/interfaces";
import TaskRow from "../TaskRow/TaskRow";

interface IAddedTaskProps {
  tasks: ITask[];
  deleteTask: (id: string) => void;
}

const AddedTasksTable: React.FC<IAddedTaskProps> = ({ tasks, deleteTask }) => {
  const onDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <>
      {tasks.map((task: ITask) => (
        <TaskRow key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </>
  );
};

export default AddedTasksTable;

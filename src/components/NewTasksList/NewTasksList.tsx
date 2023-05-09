import React from "react";
import NewTaskRow from "../NewTaskRow/NewTaskRow";

interface INewTasksLisProps {
  tasks: ITask[];
  deleteTask: (id: number) => void;
}

const NewTasksList: React.FC<INewTasksLisProps> = ({ tasks, deleteTask }) => {
  const onDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  return (
    <>
      {tasks.map((task: ITask) => (
        <NewTaskRow key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </>
  );
};

export default NewTasksList;

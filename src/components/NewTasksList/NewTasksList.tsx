import React from "react";
import NewTaskRow from "../NewTaskRow/NewTaskRow";

interface INewTasksLisProps {
  tasks: ITask[];
  removeTask: (id: number) => void;
}

const NewTasksList: React.FC<INewTasksLisProps> = ({ tasks, removeTask }) => {
  const onRemoveTask = (taskId: number) => {
    removeTask(taskId);
  };

  return (
    <>
      {tasks.map((task: ITask) => (
        <NewTaskRow key={task.id} task={task} onRemoveTask={onRemoveTask} />
      ))}
    </>
  );
};

export default NewTasksList;

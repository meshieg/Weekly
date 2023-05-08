import React from "react";
import TaskRow from "../../components/TaskRow/TaskRow";

interface ITaskListProps {
  tasks: ITask[];
  onCheckedClick?: (taskId: number) => void;
  onTaskClick?: (taskId: number) => void;
  onDeleteClick?: (taskId: number) => void;
  onEditClick?: (taskId: number) => void;
}

const TasksList: React.FC<ITaskListProps> = (props) => {
  return (
    <div>
      {props.tasks?.map((task) => {
        return (
          <TaskRow
            key={task.id}
            id={task.id}
            title={task.title}
            date={task.dueDate}
            tag={task.tag}
            isDone={task.isDone}
            checkbox={true}
            onCheckedClick={props.onCheckedClick}
            onClick={props.onTaskClick}
            // onDeleteClick={props.onDeleteClick}
          />
        );
      })}
    </div>
  );
};

export default TasksList;

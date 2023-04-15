import { ITask } from "../../utils/interfaces";
import "./TaskRow.css";

interface ITaskRowProps {
  task: ITask;
  onDeleteTask: (taskId: string) => void;
}

const TaskRow = ({ task, onDeleteTask }: ITaskRowProps) => {
  return (
    <div className="task-row__row">
      <div>
        <h3>{task.title}</h3>
        {/* <div>{task.date.toDateString()}</div> */}
        <div>{task.date}</div>
      </div>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskRow;

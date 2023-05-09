import "./NewTaskRow.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface INewTaskRowProps {
  task: ITask;
  onDeleteTask: (taskId: number) => void;
}

const NewTaskRow = ({ task, onDeleteTask }: INewTaskRowProps) => {
  return (
    <div className="task-row__row">
      <div>
        <h3>{task.title}</h3>
        <div>{task.dueDate.toDateString()}</div>
      </div>
      <DeleteOutlinedIcon onClick={() => onDeleteTask(task.id)} />
    </div>
  );
};

export default NewTaskRow;

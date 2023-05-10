import Tag from "../Tag/Tag";
import "./NewTaskRow.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface INewTaskRowProps {
  task: ITask;
  onRemoveTask: (taskId: number) => void;
}

const NewTaskRow = ({ task, onRemoveTask }: INewTaskRowProps) => {
  return (
    <div className="task-row">
      <Tag width="2.2rem" color={task.tag?.color} />
      <div className="task-row__details">
        <div className="task-row__info">
          <h3 className="task-row__title">{task.title}</h3>
          <div>{task.dueDate.toLocaleDateString("en-GB")}</div>
        </div>
        <DeleteOutlinedIcon onClick={() => onRemoveTask(task.id)} />
      </div>
    </div>
  );
};

export default NewTaskRow;

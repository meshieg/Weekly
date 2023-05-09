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
      {/* <div className="task-row__tag"> */}
        <Tag width="2rem" color={task.tag?.color} />
      {/* </div> */}
      <div className="task-row__details">
        <div>
          <h3>{task.title}</h3>
          <div>{task.dueDate.toLocaleDateString()}</div>
        </div>
        <DeleteOutlinedIcon onClick={() => onRemoveTask(task.id)} />
      </div>
    </div>
  );
};

export default NewTaskRow;

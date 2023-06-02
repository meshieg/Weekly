import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import "./DisplayAssignment.css";
import useToolbar from "../../customHooks/useToolbar";
import { PriorityLabels } from "../../utils/constants";

const DisplayTaskPage = () => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  const { setToolbar } = useToolbar();
  var taskToShow: ITask = navLocation.state?.task;
  var taskId: number = navLocation.state?.id;

  useEffect(() => {
    setToolbar("Task Details", true);

    if (taskId !== undefined) {
      //ToDo add request fromDB
    }
  }, [taskId]);

  const navToEdit = () => {
    navigate("/add-task", {
      state: { task: taskToShow, isInDB: taskId !== undefined },
    });
  };
  return (
    <>
      {taskToShow === undefined ? (
        <>nothing to show</>
      ) : (
        <div className="fieldsContainer">
          <div></div>
          <TextField
            value={taskToShow.title}
            disabled={true}
            label="Title"
            variant="standard"
          />
          <TextField
            value={taskToShow.location === "" ? " " : taskToShow.location}
            disabled={true}
            label="Location"
            variant="standard"
          />
          <TextField
            value={taskToShow.description === "" ? " " : taskToShow.description}
            disabled={true}
            label="Description"
            variant="standard"
          />
          <TextField
            value={taskToShow.dueDate.toLocaleDateString()}
            disabled={true}
            label="Due date"
            variant="standard"
          />
          <TextField
            value={taskToShow.dueDate.toLocaleTimeString()}
            disabled={true}
            label="Due time"
            variant="standard"
          />
          <TextField
            value={taskToShow.priority}
            // value={ PriorityLabels[taskToShow.priority]}
            disabled={true}
            label="Priority"
            variant="standard"
          />
          <div className="btnContainer">
            <button className="btn btn__primary" onClick={navToEdit}>
              Edit
            </button>
            <button className="btn btn__primary" onClick={navToEdit}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default DisplayTaskPage;

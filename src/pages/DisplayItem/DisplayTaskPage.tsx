import { useEffect, useState } from "react";
import { Alert, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import "./DisplayAssignment.css";
import useToolbar from "../../customHooks/useToolbar";
import { Priority, PriorityLabels } from "../../utils/constants";
import Tag from "../../components/Tag/Tag";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { TaskService } from "../../services/task.service";
import { instanceOfTask } from "../../utils/typeChecks";
import { useAppContext } from "../../contexts/AppContext";
import { USER_MESSAGES } from "../../utils/messages";
import MessageDialog from "../../components/MessageDialog/MessageDialog";
import Loading from "../../components/Loading/Loading";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const textFieldStyle = {
  margin: "1rem 0",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
  },
};

const DisplayTaskPage = () => {
  const { removeItem, getById } = useNewItemsContext();
  const navigate = useNavigate();
  const navLocation = useLocation();
  const { setToolbar } = useToolbar();
  const [taskToShow, setTaskToShow] = useState<ITask | undefined>(undefined);
  const taskId = navLocation.state?.taskId;
  const { setPopupMessage, popupMessage } = useAppContext();
  const [dataLoading, setDataLoading] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    setToolbar("Task Details", true);
    if (navLocation.state?.isFromDB) {
      setDataLoading(true);

      TaskService.getTaskById(taskId)
        .then((task) => {
          setTaskToShow(task as ITask);
        })
        .catch((err) => {
          setAlert(
            "error",
            "Something went wrong trying to get task data:( please try again later"
          );
          console.log(err);
        })
        .finally(() => setDataLoading(false));
    } else if (taskId !== undefined) {
      const task = getById(taskId);
      if (task && instanceOfTask(task)) setTaskToShow(task as ITask);
    }
  }, [taskId]);

  const navToEdit = () => {
    navigate("/add-task", {
      state: { task: taskToShow, isFromDB: navLocation.state?.isFromDB },
    });
  };

  const deleteTask = () => {
    setPopupMessage(undefined);
    if (taskToShow) {
      if (navLocation.state?.isFromDB) {
        TaskService.deleteTask(taskToShow.id)
          .then((deleted) => {
            if (deleted) {
              setAlert("success", "Task deleted successfully");
              navigate(-1);
            } else {
              setAlert("error", "Failed to delete task");
            }
          })
          .catch(() => {
            setAlert("error", "Failed to delete task");
          });
      } else {
        setAlert("success", "Task deleted successfully");
        removeItem(taskToShow.id);
        navigate(-1);
      }
    }
  };

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <>
      {taskToShow === undefined ? (
        <>nothing to show</>
      ) : (
        <div className="pageContainer">
          {navLocation.state?.isFromDB &&
            (taskToShow?.assignment === null ||
              taskToShow?.assignment === undefined) && (
              <Alert severity="info">This task has no assignment</Alert>
            )}
          <div className="fieldsContainer">
            <TextField
              value={taskToShow.title}
              disabled={true}
              label="Title"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={taskToShow.location === "" ? " " : taskToShow.location}
              disabled={true}
              label="Location"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={taskToShow.estTime}
              disabled={true}
              label="Estimated time"
              variant="standard"
              type="number"
              sx={textFieldStyle}
            />
            <div className="dateRowContainer">
              <TextField
                value={taskToShow.dueDate.toLocaleDateString("en-GB")}
                disabled={true}
                label="Due date"
                variant="standard"
                sx={textFieldStyle}
              />
              <TextField
                value={taskToShow.dueDate.toLocaleTimeString("he-IL")}
                disabled={true}
                label="Due time"
                variant="standard"
                sx={textFieldStyle}
              />
            </div>
            <TextField
              value={
                taskToShow.description === "" ? " " : taskToShow.description
              }
              multiline
              disabled={true}
              label="Description"
              variant="standard"
              sx={textFieldStyle}
            />
            <TextField
              value={PriorityLabels[taskToShow.priority as Priority]}
              disabled={true}
              label="Priority"
              variant="standard"
              sx={textFieldStyle}
            />
            {navLocation.state?.isFromDB && (
              <div className="dateRowContainer">
                <TextField
                  value={
                    taskToShow.assignment
                      ? taskToShow.assignment?.toLocaleDateString("en-GB")
                      : " "
                  }
                  disabled={true}
                  label="Assignment date"
                  variant="standard"
                  sx={textFieldStyle}
                />
                <TextField
                  value={
                    taskToShow.assignment
                      ? taskToShow.assignment?.toLocaleTimeString("he-IL")
                      : " "
                  }
                  disabled={true}
                  label="Assignment time"
                  variant="standard"
                  sx={textFieldStyle}
                />
              </div>
            )}
            <Tag
              width="2.8rem"
              label={taskToShow.tag?.name}
              color={taskToShow.tag?.color}
            />
          </div>
          <div className="btnContainer">
            <button
              className="btn btn__primary display__button"
              onClick={navToEdit}
            >
              Edit
            </button>
            <button
              className="btn btn__primary display__button"
              onClick={() =>
                setPopupMessage(USER_MESSAGES.DELETE_CONFIRMATION_MESSAGE)
              }
              style={{ background: "#d32f2f", border: "#d32f2f" }}
            >
              Delete
            </button>
          </div>
          <AlertPopup />
        </div>
      )}

      <MessageDialog
        open={popupMessage !== undefined}
        onClose={() => {
          setPopupMessage(undefined);
        }}
        title={popupMessage?.title}
        message={popupMessage?.message}
        extraMessage={popupMessage?.extraMessage}
        primaryButtonText={popupMessage?.primaryButtonText}
        secondaryButtonText={popupMessage?.secondaryButtonText}
        icon={popupMessage?.icon}
        primaryButtonAction={deleteTask}
        secondaryButtonAction={() => setPopupMessage(undefined)}
      />
    </>
  );
};
export default DisplayTaskPage;

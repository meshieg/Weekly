import { useEffect, useState } from "react";
import "./AddTaskPage.css";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, taskFields } from "./AddTaskForm";
import { TaskService } from "../../services/task.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import moment from "moment";
import Tag from "../../components/Tag/Tag";
import TagsListPopup from "../../components/TagsListPopup/TagsListPopup";
import { TagService } from "../../services/tag.service";
import { DEFAULT_TAG, EditScreensState, Priority } from "../../utils/constants";
import useToolbar from "../../customHooks/useToolbar";
import {
  roundToNearestHour,
  validateTaskInputs,
} from "../../helpers/functions";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import AlgoMessagePopup from "../../components/AlgoMessagePopup/AlgoMessagePopup";
import { ScheduleService } from "../../services/schedule.service";
import { useAppContext } from "../../contexts/AppContext";
import { serverError, USER_MESSAGES } from "../../utils/messages";
import useUser from "../../customHooks/useUser";

const fieldsToDisplayAlgoPopup = [
  "estTime",
  "dueDate",
  "priority",
  "assignment",
];

const AddTaskPage = () => {
  const location = useLocation();
  const taskToUpdate: ITask = location.state?.task;
  const initialValues: IInputs = {
    title: taskToUpdate?.title ?? "",
    location: taskToUpdate?.location ?? "",
    estTime: taskToUpdate?.estTime ?? 1,
    dueDate: taskToUpdate?.dueDate ?? new Date(),
    dueTime: taskToUpdate?.dueDate ?? roundToNearestHour(new Date()),
    description: taskToUpdate?.description ?? "",
    priority: taskToUpdate?.priority ?? Priority.LOW,
    assignmentDate: taskToUpdate?.assignment ?? undefined,
    assignmentTime: taskToUpdate?.assignment ?? undefined,
  };
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);
  const [tag, setTag] = useState<ITag>(taskToUpdate?.tag || DEFAULT_TAG);
  const navigate = useNavigate();
  const { addItem, updateItem } = useNewItemsContext();
  const [tagsPopupOpen, setTagsPopupOpen] = useState<boolean>(false);
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const { setToolbar } = useToolbar();
  const { setAlert } = useAlert();
  const [algoPopupOpen, setAlgoPopupOpen] = useState(false);
  const [newTaskState, setNewTaskState] = useState<ITask>();
  const { setLoading, setPopupMessage } = useAppContext();
  const { user } = useUser();

  const getScreenState = () => {
    if (taskToUpdate === undefined) {
      return EditScreensState.ADD;
    }
    if (location.state?.isFromDB) {
      return EditScreensState.EDIT;
    }
    return EditScreensState.EDIT_LOCAL;
  };

  const screenState = getScreenState();

  useEffect(() => {
    setInputsValues(initialValues);
    setToolbar(
      location.state?.task === undefined ? "Add Task" : "Edit Task",
      true
    );

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof IInputs;
    setInputsValues((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const saveTask = (event: any) => {
    event.preventDefault();

    const dueDateAndTime: string =
      moment(inputValues.dueDate).format("YYYY-MM-DD") +
      " " +
      moment(inputValues.dueTime).format("HH:00:00");

    let assignmentDateAndTime: string | undefined = undefined;
    if (inputValues.assignmentDate && initialValues.assignmentTime) {
      assignmentDateAndTime =
        moment(inputValues.assignmentDate).format("YYYY-MM-DD") +
        " " +
        moment(inputValues.assignmentTime).format("HH:00:00");
    }

    const newTask: ITask = {
      id: taskToUpdate ? taskToUpdate?.id : 0,
      title: inputValues.title,
      location: inputValues.location,
      estTime: inputValues.estTime,
      dueDate: new Date(dueDateAndTime),
      description: inputValues.description,
      priority: inputValues.priority,
      tag: tag.id !== 0 ? tag : undefined,
      assignment: assignmentDateAndTime
        ? new Date(assignmentDateAndTime)
        : undefined,
    };

    setNewTaskState(newTask);

    // Validate inputs
    const alertMessage = validateTaskInputs(
      newTask,
      user?.beginDayHour,
      user?.endDayHour
    );
    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    // Save task
    switch (screenState) {
      // add new task
      case EditScreensState.ADD:
        addItem(newTask);
        setInputsValues(initialValues);
        navigate("/new-tasks");
        break;

      // update task on DB
      case EditScreensState.EDIT:
        if (displayAlgoPopup(newTask)) {
          setAlgoPopupOpen(true);
        } else {
          updateTaskOnDB(newTask);
        }
        break;

      // update local task
      case EditScreensState.EDIT_LOCAL:
        updateItem(newTask);
        navigate(-1);
        break;
    }
  };

  const displayAlgoPopup = (newTask: ITask) => {
    let changedFieldKey;
    if (newTask) {
      changedFieldKey = fieldsToDisplayAlgoPopup.find(
        (fieldKey: string) =>
          newTask[fieldKey as keyof ITask]?.toString() !==
          taskToUpdate[fieldKey as keyof ITask]?.toString()
      );
    }

    return changedFieldKey !== undefined;
  };

  const updateTaskOnDB = async (newTask: ITask) => {
    if (newTask) {
      return await TaskService.updateTask(newTask)
        .then((updatedTask) => {
          if (updatedTask) {
            navigate(-1);
            // setAlert("success", "Task saved successfully");
          } else {
            setAlert("error", "Failed to save task");
          }
        })
        .catch((err) => {
          if (err?.response?.data?.errors[0]?.message) {
            setAlert("error", err?.response?.data?.errors[0]?.message);
          } else {
            console.log(err.messages);
            setAlert("error", "Failed to save task");
          }
        })
        .finally(() => {
          setAlgoPopupOpen(false);
        });
    }
  };

  const generateSchedule = () => {
    if (newTaskState) {
      setLoading(true);

      ScheduleService.generateSchedule([newTaskState])
        .then((data: any) => {
          if (data?.notAssignedTasks && data?.notAssignedTasks.length > 0) {
            setPopupMessage(
              USER_MESSAGES.SCHEDULE_GENERATE_SUCCESS_WITH_MESSAGE
            );
          } else if (data?.assignedTasks && data?.assignedTasks.length > 0) {
            setPopupMessage(USER_MESSAGES.SCHEDULE_GENERATE_SUCCESS);
          }
        })
        .catch((error) => {
          setPopupMessage(serverError(error?.response.data.errors[0]));
        })
        .finally(() => {
          setLoading(false);
          navigate("/");
        });
    }
  };

  const cancelTask = (event: any) => {
    event.preventDefault();
    setInputsValues(initialValues);
    navigate(-1);
  };

  const onTagClick = () => {
    setTagsPopupOpen(true);
  };

  const onSelectTag = (tag: ITag) => {
    setTag(tag);
    setTagsPopupOpen(false);
  };

  return (
    <div className="add-task__pageContainer">
      <form onSubmit={saveTask} onReset={cancelTask} className="add-task__form">
        {Object.keys(taskFields).map((field) => {
          const fieldKey = field as keyof IInputs;

          // Display assignment field only in update task from DB
          if (
            (fieldKey === "assignmentDate" || fieldKey === "assignmentTime") &&
            screenState !== EditScreensState.EDIT
          ) {
            return <></>;
          }

          return (
            <SuperInputField
              key={fieldKey}
              id={fieldKey}
              label={taskFields[fieldKey]?.label || ""}
              type={taskFields[fieldKey]?.type}
              options={taskFields[fieldKey]?.options}
              value={inputValues[fieldKey]}
              onChange={setValues}
              required={taskFields[fieldKey]?.required}
              multiline={taskFields[fieldKey]?.multiline}
            />
          );
        })}

        <Tag
          width="2.8rem"
          label={tag.name}
          color={tag.color}
          onClick={onTagClick}
        />

        <TagsListPopup
          open={tagsPopupOpen}
          onClose={() => setTagsPopupOpen(false)}
          tags={tagsList}
          onTagClick={onSelectTag}
        />

        <AlertPopup />

        <div className="add-task_buttons">
          <button className="add-task__btn btn btn__primary" type="submit">
            Save
          </button>
          <button className="add-task__btn btn btn__secondary" type="reset">
            Cancel
          </button>
        </div>
      </form>

      <AlgoMessagePopup
        open={algoPopupOpen}
        onClose={() => setAlgoPopupOpen(false)}
        primaryAction={generateSchedule}
        secondaryAction={() => newTaskState && updateTaskOnDB(newTaskState)}
      />
    </div>
  );
};

export default AddTaskPage;

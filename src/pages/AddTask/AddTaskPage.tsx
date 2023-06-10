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
import { DEFAULT_TAG, Priority } from "../../utils/constants";
import useToolbar from "../../customHooks/useToolbar";
import { validateTaskInputs } from "../../helpers/functions";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const AddTaskPage = () => {
  const location = useLocation();
  const taskToUpdate: ITask = location.state?.task;
  const initialValues: IInputs = {
    title: taskToUpdate?.title ?? "",
    location: taskToUpdate?.location ?? "",
    estTime: taskToUpdate?.estTime ?? 1,
    dueDate: taskToUpdate?.dueDate ?? new Date(),
    dueTime: taskToUpdate?.dueDate ?? new Date(0, 0, 0, 0, 0, 0),
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
  // const [displayAlgoPopup, setDisplayAlgoPopup] = useState(false);

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

    let assignemtDateAndTime: string | undefined = undefined;
    if (inputValues.assignmentDate && initialValues.assignmentTime) {
      assignemtDateAndTime =
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
      assignment: assignemtDateAndTime
        ? new Date(assignemtDateAndTime)
        : undefined,
    };

    // Validate inputs
    const alertMessage = validateTaskInputs(newTask);
    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    if (taskToUpdate === undefined) {
      // add new task
      addItem(newTask);
      setInputsValues(initialValues);
      navigate("/new-tasks");
    } else if (location.state?.isFromDB) {
      // update task on DB
      TaskService.updateTask(newTask)
        .then((updatedTask) => {
          if (updatedTask) {
            navigate(-1);
          } else {
            setAlert("error", "failed to save task");
          }
        })
        .catch((err) => {
          setAlert("error", "failed to save task");
        });
    } else {
      // update local task
      updateItem(newTask);
      navigate(-1);
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
            (!taskToUpdate || !location.state?.isFromDB)
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

        {/* <div className="colorPickerContainer">
          <Colorful
            color={tag.color}
            onChange={(color) => {
              console.log(color.hex);
              setTag((prev) => ({ ...prev, color: color.hex }));
            }}
            disableAlpha={true}
          />
        </div> */}

        <div className="add-task_buttons">
          <button className="add-task__btn btn btn__primary" type="submit">
            Save
          </button>
          <button className="add-task__btn btn btn__secondary" type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;

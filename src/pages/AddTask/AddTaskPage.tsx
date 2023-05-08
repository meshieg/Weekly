import { useState } from "react";
import moment from "moment";
import "./AddTaskPage.css";
import { ITaskEntity } from "../../utils/types";
import AddTag from "../../components/AddTag/AddTag";
import { fieldsTypes } from "../../utils/constants";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { taskFields } from "./AddTaskForm";
import { TaskService } from "../../services/task.service";
import Colorful from "@uiw/react-color-colorful";

// type inputFields = {
//   [id in keyof ITaskEntity]: IField;
// };

const AddTaskPage = () => {
  const initialValues: ITaskEntity = {
    title: "",
    location: "",
    estTime: 1,
    dueDate: new Date(),
    description: "",
    priority: 1,
    tag: { name: "", color: "#8a64d6" },
  };
  const [newTask, setNewTask] = useState<ITaskEntity>(initialValues);

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof ITaskEntity;
    setNewTask((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const setTagColor = (color: any) => {
    console.log("new color: " + color);
  };

  const saveTask = (event: any) => {
    event.preventDefault();
    console.log(newTask);
    // TaskService.saveTask(newTask)
    //   .then(() => console.log("Task saved successfully"))
    //   .catch((error) => console.log(error));
  };

  const cancelTask = (event: any) => {
    event.preventDefault();
    setNewTask(initialValues);
  };

  return (
    <div className="pageContainer">
      <form onSubmit={saveTask} onReset={cancelTask}>
        <div className="add_task__form">
          {Object.keys(taskFields).map((field) => {
            const fieldKey = field as keyof ITaskEntity;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={taskFields[fieldKey]?.label || ""}
                type={taskFields[fieldKey]?.type}
                options={taskFields[fieldKey]?.options}
                value={newTask[fieldKey]}
                onChange={setValues}
                required={taskFields[fieldKey]?.required}
              />
            );
          })}
        </div>

        <div className="colorPickerContainer">
          <Colorful
            color={newTask.tag ? newTask.tag.color : "#8a64d6"}
            disableAlpha={true}
            onChange={setTagColor}
          />
        </div>

        {/* <input
          type="number"
          value={newTask.priority}
          onChange={setValues}
          placeholder="עדיפות"
          min="1"
          max="10"
        ></input> */}

        <div className="add_task_buttons">
          <button className="btn btn__primary" type="submit">
            SAVE
          </button>
          <button className="btn btn__secondary" type="reset">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddTaskPage;

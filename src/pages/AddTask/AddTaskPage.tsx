import { useState } from "react";
import "./AddTaskPage.css";
import AddTag from "../../components/AddTag/AddTag";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, taskFields } from "./AddTaskForm";
import { TaskService } from "../../services/task.service";
import Colorful from "@uiw/react-color-colorful";

const AddTaskPage = () => {
  const initialValues: IInputs = {
    title: "",
    location: "",
    estTime: 1,
    dueDate: new Date(),
    description: "",
    priority: 1,
    // tag: { name: "", color: "#8a64d6" },
  };
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);
  const [tag, setTag] = useState<ITag>({ name: "default", color: "#8a64d6" });

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

    const newTask: ITask = {
      id: 0,
      title: inputValues.title,
      location: inputValues.location,
      estTime: inputValues.estTime,
      dueDate: inputValues.dueDate,
      description: inputValues.description,
      priority: inputValues.priority,
      tag: tag,
    };

    console.log(newTask);
    // TaskService.saveTask(newTask)
    //   .then(() => console.log("Task saved successfully"))
    //   .catch((error) => console.log(error));
  };

  const cancelTask = (event: any) => {
    event.preventDefault();
    setInputsValues(initialValues);
  };

  return (
    <div className="pageContainer">
      <form onSubmit={saveTask} onReset={cancelTask}>
        <div className="add_task__form">
          {Object.keys(taskFields).map((field) => {
            const fieldKey = field as keyof IInputs;

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
              />
            );
          })}
        </div>

        <div className="colorPickerContainer">
          <Colorful
            color={tag.color}
            onChange={(color) => {
              console.log(color.hex);
              setTag((prev) => ({ ...prev, color: color.hex }));
            }}
            disableAlpha={true}
          />
        </div>

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

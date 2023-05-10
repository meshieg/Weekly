import { useState } from "react";
import moment from "moment";
import "./AddTaskPage.css";
// import { ITask } from "../../utils/types";
import AddTag from "../../components/AddTag/AddTag";
import { fieldsTypes } from "../../utils/constants";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, taskFields } from "./AddTaskForm";
import { TaskService } from "../../services/task.service";
import { useNavigate } from 'react-router-dom';
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { v4 as uuid } from 'uuid';

// type inputFields = {
//   [id in keyof ITask]: IField;
// };

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
  const navigate = useNavigate();
  const { addTask } = useNewItemsContext();

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
      id: 0, //uuid().slice(0,8),
      title: inputValues.title,
      location: inputValues.location,
      estTime: inputValues.estTime,
      dueDate: inputValues.dueDate,
      description: inputValues.description,
      priority: inputValues.priority,
      // tag: inputValues.tag,
    };

    console.log(newTask);
    // TaskService.saveTask(newTask)
    //   .then(() => console.log("Task saved successfully"))
    //   .catch((error) => console.log(error));

    addTask(newTask);
    navigate('/new-tasks');
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
                // label="test"

                type={taskFields[fieldKey]?.type}
                // type={fieldsTypes.TextField}

                options={taskFields[fieldKey]?.options}
                value={inputValues[fieldKey]}
                onChange={setValues}
                // required={taskFields[fieldKey].required}
                required={true}
              />
            );
          })}
        </div>

        {/* <AddTag color={newTask.tag.color ?? "#8a64d6"} /> */}

        {/* <input
          type="number"
          value={newTask.priority}
          onChange={setValues}
          placeholder="עדיפות"
          min="1"
          max="10"
        ></input> */}

        <div className="add_task__buttons">
          <button className="btn btn__primary" type="submit">
            שמור
          </button>
          <button className="btn btn__secondary" type="reset">
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;

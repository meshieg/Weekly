import { useState } from "react";
import moment from "moment";
import "./AddTaskPage.css";
import { ITaskEntity } from "../../utils/types";
import AddTag from "../../components/AddTag/AddTag";
import { fieldsTypes } from "../../utils/constants";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { taskFields } from "./AddTaskForm";

// type inputFields = {
//   [id in keyof ITaskEntity]: IField;
// };

const AddTaskPage = () => {
  const initialValues: ITaskEntity = {
    title: "",
    location: "",
    destDate: new Date(),
    time: "",
    desc: "",
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

  const saveTask = (event: any) => {
    event.preventDefault();
    console.log(newTask);
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

                // label={taskFields[fieldKey].label}
                label="test"

                // type={taskFields[fieldKey].type}
                type={fieldsTypes.TextField}

                // options={taskFields[fieldKey].options}

                value={newTask[fieldKey]}
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
          <button
            className="btn btn__primary"
            type="submit">
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

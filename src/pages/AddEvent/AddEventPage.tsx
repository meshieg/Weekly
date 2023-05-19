import { useState } from "react";
import "./AddEventPage.css";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, eventFields } from "./AddEventForm";
import Colorful from "@uiw/react-color-colorful";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { useNavigate } from "react-router-dom";

const AddEventPage = () => {
  const initialValues: IInputs = {
    title: "",
    location: "",
    startTime: new Date(),
    endTime: new Date(),
    // startDate: new Date(),
    // endDate: new Date(),
    // allDay: false,
    description: "",
    // tag: { name: "", color: "#8a64d6" },
  };
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);
  // const [inputValues, setInputsValues] = useState<IAddEvent>(initialValues);
  const [tag, setTag] = useState<ITag>({ name: "default", color: "#8a64d6" });
  const navigate = useNavigate();
  const { addItem } = useNewItemsContext();

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof IInputs;
    // const key = objKey as keyof IAddEvent;
    setInputsValues((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const saveTask = (event: any) => {
    event.preventDefault();

    const newEvent: IEvent = {
      id: 0,
      title: inputValues.title,
      location: inputValues.location,
      startTime: inputValues.startTime,
      endTime: inputValues.endTime,
      // startTime: inputValues.startTime,
      // endTime: inputValues.endTime,
      // startDate: inputValues.startDate,
      // endDate: inputValues.endDate,
      // allDay: inputValues.allDay,
      tag: tag,
      description: inputValues.description,
    };

    // console.log(newEvent);
    addItem(newEvent);
    setInputsValues(initialValues);
    navigate("/new-tasks");

    // TaskService.saveTask(newTask)
    //   .then(() => console.log("Task saved successfully"))
    //   .catch((error) => console.log(error));
  };

  const cancelTask = (event: any) => {
    event.preventDefault();
    setInputsValues(initialValues);
    navigate(-1);
  };

  return (
    <div className="pageContainer">
      <form onSubmit={saveTask} onReset={cancelTask}>
        <div className="add_task__form">
          {Object.keys(eventFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={eventFields[fieldKey]?.label || ""}
                type={eventFields[fieldKey]?.type}
                options={eventFields[fieldKey]?.options}
                value={inputValues[fieldKey]}
                onChange={setValues}
                required={eventFields[fieldKey]?.required}
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
export default AddEventPage;

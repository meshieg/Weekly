import { useState } from "react";
import moment from "moment";
import "./AddTaskPage.css";
import { ITaskEntity } from "../../utils/types";
import AddTag from "../../utils/components/AddTag";

const AddTaskPage = () => {
  const [newTask, setNewTask] = useState<ITaskEntity>({
    title: "",
    location: "",
    destDate: new Date(),
    time: "",
    desc: "",
    priority: 1,
    tag: { name: "", color: "#8a64d6" },
  });
  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setNewTask(
      (prevTask): ITaskEntity => ({
        ...prevTask, // keep all other key-value pairs
        title: e.currentTarget.value, // update the value of specific key
      })
    );
  };

  const [taskLocation, setTaskLocation] = useState("");
  const onChangeLocation = (e: React.FormEvent<HTMLInputElement>) =>
    setTaskLocation(e.currentTarget.value);

  const [taskDestDate, setDestDate] = useState(moment().format("DD-MM-YYYY"));
  const onChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
    const newDate = moment(new Date(e.currentTarget.value)).format(
      "DD-MM-YYYY"
    );
    setDestDate(newDate);
  };

  const [taskTime, setTextTime] = useState("");
  const onChangeTime = (e: React.FormEvent<HTMLInputElement>) =>
    setTextTime(e.currentTarget.value);

  const [taskDesc, setTaskDesc] = useState("");
  const onChangeDesc = (e: React.FormEvent<HTMLInputElement>) =>
    setTaskDesc(e.currentTarget.value);

  const [taskPriority, setTaskPriority] = useState("");
  const onChangePriority = (e: React.FormEvent<HTMLInputElement>) =>
    setTaskPriority(e.currentTarget.value);

  const onSave = () => {
    console.log(
      `title: ${newTask.title}, location: ${taskLocation}, date: ${taskDestDate}, time: ${taskTime}, Priority: ${taskPriority}`
    );
  };
  const onCancel = () => {
    console.log("cancel");
  };

  return (
    <div className="pageContainer">
      <input
        type="text"
        value={newTask.title}
        onChange={onChangeTitle}
        placeholder="כותרת משימה"
      ></input>
      <input
        type="text"
        value={taskLocation}
        onChange={onChangeLocation}
        placeholder="מיקום"
      ></input>
      <input
        type="date"
        value={taskDestDate}
        onChange={onChangeDate}
        placeholder="תאריך יעד"
      ></input>
      <input
        type="time"
        value={taskTime}
        onChange={onChangeTime}
        placeholder="זמן משוער"
      ></input>
      <input
        type="text"
        value={taskDesc}
        onChange={onChangeDesc}
        placeholder="תיאור"
      ></input>
      {/* <textarea value={taskDesc} placeholder="תיאור"></textarea> */}
      <input
        type="number"
        value={taskPriority}
        onChange={onChangePriority}
        placeholder="עדיפות"
        min="1"
        max="10"
      ></input>
      <AddTag color={newTask.tag.color ?? "#8a64d6"} />
      <button
        onClick={onSave}
        className="btn btn__primary"
        style={{ margin: "2rem" }}
      >
        שמור
      </button>
      <button onClick={onCancel} className="btn btn__secondary">
        ביטול
      </button>
    </div>
  );
};
export default AddTaskPage;

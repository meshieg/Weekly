// import { ITask } from "../../utils/interfaces";
import "./AddedTasksGroupPage.css";
import AddedTasksTable from "../../components/AddedTasksTable/AddedTasksTable";
import AddedTasks from "./AddedTasks.json";

const AddedTasksGroupPage = () => {
  const deleteTask = (taskId: string) => {
    console.log(taskId);
  };

  // const tasks: ITask[] = [
  //   {
  //     id: "1",
  //     title: "weekly",
  //     tagColor: "white", // Change to RGB
  //     date: new Date(),
  //   },
  //   {
  //     id: "2",
  //     title: "seminar",
  //     tagColor: "black", // Change to RGB
  //     date: new Date(),
  //   },
  // ];

  return (
    <>
      <h1>My Added Tasks</h1>
      <div className="added-tasks__actions">
        <button className="btn btn__primary added-tasks__action-btn">
          Schedule!
        </button>
        <button className="btn btn__secondary added-tasks__action-btn">
          Cancel
        </button>
      </div>
      <AddedTasksTable tasks={AddedTasks.tasks} deleteTask={deleteTask} />
    </>
  );
};

export default AddedTasksGroupPage;

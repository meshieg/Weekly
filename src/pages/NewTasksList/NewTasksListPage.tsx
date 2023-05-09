import "./NewTasksListPage.css";
import NewTasksList from "../../components/NewTasksList/NewTasksList";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

let id = 1;     // TODO: Replace with a better method?

const NewTasksListPage = (
) => {
  // const [currTask, setCurrTask] = useState<ITask>(useLocation().state);
  const currTask: ITask = useLocation().state;
  const [newTasks, setNewTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setNewTasks(prevArray => [...prevArray, currTask]);
    id = id + 1;
  }, [currTask]);

  // const addTask = () => {
  //   // const newTask: ITask = {
  //   //   id: id,
  //   //   title: id.toLocaleString(),
  //   //   destTime: 34,
  //   //   dueDate: new Date()
  //   // }

  //   // setCurrTask(newTask);
  //   setNewTasks(prevArray => [...prevArray, newTask]);
  //   id = id + 1;
  // }

  const deleteTask = (taskId: number) => {
    const tasksCopy = newTasks.filter(task => task.id !== taskId);
    setNewTasks(tasksCopy);
  };

  const scheduleTasks = (event: React.SyntheticEvent) => {
    event.preventDefault();



    // console.log(tasks);
    // TaskService.saveTask(newTask)
    //   .then(() => console.log("Task saved successfully"))
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="added-tasks__actions">
        <button className="btn btn__primary added-tasks__action-btn" onClick={scheduleTasks}>
          Schedule!
        </button>
        <button className="btn btn__secondary added-tasks__action-btn">
          Cancel
        </button>
      </div>
      <NewTasksList tasks={newTasks} deleteTask={deleteTask} />
      <Link to='/addTask'>
        <button>Add</button>
      </Link>
    </>
  );
};

export default NewTasksListPage;

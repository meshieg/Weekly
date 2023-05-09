import "./NewTasksListPage.css";
import NewTasksList from "../../components/NewTasksList/NewTasksList";
import { Link } from "react-router-dom";
import { useNewTasksContext } from "../../contexts/NewTasksStore/NewTasksContext";
import { ScheduleService } from "../../services/schedule.service";

// let id = 1;     // TODO: Replace with a better method?

const NewTasksListPage = (
) => {
  const { newTasks, removeTask, refreshTasks } = useNewTasksContext();

  // const removeTask = (taskId: number) => {
  //   const tasksCopy = newTasks.filter(task => task.id !== taskId);
  //   setNewTasks(tasksCopy);
  // };

  const scheduleTasks = (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log(newTasks);
    console.log("generated!");
    refreshTasks();
    // ScheduleService.generateSchedule(newTasks)
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
      <NewTasksList tasks={newTasks} removeTask={removeTask} />
      <Link to='/add-task'>
        <button>Add</button>
      </Link>
    </>
  );
};

export default NewTasksListPage;

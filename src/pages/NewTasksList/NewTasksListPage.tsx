import "./NewTasksListPage.css";
import NewTasksList from "../../components/NewTasksList/NewTasksList";
import { Link } from "react-router-dom";
import { useNewTasksContext } from "../../contexts/NewTasksStore/NewTasksContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../assets/ActionButtons/ActionButtons";

const NewTasksListPage = (
) => {
  const { newTasks, removeTask, refreshTasks } = useNewTasksContext();

  const scheduleTasks = () => {
  // (event: React.SyntheticEvent) => {
  //   event.preventDefault();

    console.log(newTasks);
    console.log("generated!");
    refreshTasks();
    // ScheduleService.generateSchedule(newTasks)
    //   .then(() => console.log("Task saved successfully"))
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      {newTasks.length === 0 ? (
      <h3 className="new-tasks__message">
        {`You have no new tasks to save :/ \n
        But you can always add new tasks :)`}
      </h3>
      ) : (<>
        <ActionButtons 
          primaryText="Schedule!"
          primaryAction={scheduleTasks}
          secondaryText="Cancel"
          secondaryAction={() => console.log("cancel")}/>
        <NewTasksList tasks={newTasks} removeTask={removeTask} />
      </>)}
      <Link to='/add-task'>
          <button>Add</button>
      </Link>
    </>
  );
};

export default NewTasksListPage;

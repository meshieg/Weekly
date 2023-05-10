import "./NewTasksListPage.css";
import { useEffect } from 'react';
import NewTasksList from "../../components/NewTasksList/NewTasksList";
import { Link } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../assets/ActionButtons/ActionButtons";
import useToolbar from "../../customHooks/useToolbar";

const NewTasksListPage = (
) => {
  const { newTasks, removeItem, refreshItems } = useNewItemsContext();
  const { setToolbar } = useToolbar();

  useEffect(() => {
    setToolbar("My New Added Tasks");
  }, []);

  const scheduleTasks = () => {
  // ScheduleService.generateSchedule(newTasks)
  //     .then(() => console.log("Task saved successfully"))
  //     .catch((error) => console.log(error));

    refreshItems();
    
  };

  return (
    <>
      {newTasks.length === 0 ? (
      <h3 className="new-tasks__message">
        {`You have no new tasks to save :/ \n
        But you can always add new tasks :)`}
      </h3>
      ) : (
      <>
        <ActionButtons 
          primaryText="Schedule!"
          primaryAction={scheduleTasks}
          secondaryText="Cancel"
          secondaryAction={() => console.log("cancel")}/>
        <NewTasksList tasks={newTasks} removeTask={removeItem} />
      </>)}
      <Link to='/add-task'>
        <button>Add</button>
      </Link>
    </>
  );
};

export default NewTasksListPage;

import "./NewItemsListPage.css";
import { useEffect } from 'react';
import NewItemsList from "../../components/NewItemsList/NewItemsList";
import { Link, useNavigate } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../assets/ActionButtons/ActionButtons";
import useToolbar from "../../customHooks/useToolbar";

const NewItemsListPage = (
) => {
  const { newTasks, newEvents, removeItem, refreshItems } = useNewItemsContext();
  const { setToolbar } = useToolbar();
  const navigate = useNavigate();

  useEffect(() => {
    setToolbar("My New Added Tasks and Events");
  }, []);

  const scheduleItems = () => {
    ScheduleService.generateSchedule(newTasks)
      .then(() => console.log("Items saved successfully"))
      .catch((error) => console.log(error));

    refreshItems(); 
  };

  const onCancelClick = () => {
    // TODO: Add 'are you sure...' question
    navigate('/');
  }

  return (
    <>
      {newTasks.length === 0 ? (
      <h3 className="new-tasks__message">
        {`You have no new items to save :/ \n
        But you can always add them here :)`}
      </h3>
      ) : (
      <>
        <ActionButtons 
          primaryText="Schedule!"
          primaryAction={scheduleItems}
          secondaryText="Cancel"
          secondaryAction={onCancelClick}/>
        <NewItemsList items={newTasks} removeItem={removeItem} />
      </>)}
      <Link to='/add-task'>
        <button>Add</button>
      </Link>
    </>
  );
};

export default NewItemsListPage;

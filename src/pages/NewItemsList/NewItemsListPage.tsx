import "./NewItemsListPage.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../assets/ActionButtons/ActionButtons";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import { ItemType } from "../../utils/constants";

const NewItemsListPage = () => {
  const { newTasks, newEvents, removeItem, refreshItems } =
    useNewItemsContext();
  const { setToolbar } = useToolbar();
  const navigate = useNavigate();

  useEffect(() => {
    setToolbar("My New Added Tasks and Events", true);
  }, []);

  const scheduleItems = () => {
    ScheduleService.generateSchedule(newTasks, newEvents)
      .then(() => {
        console.log("Items saved successfully");
        refreshItems();
      })
      .catch((error) => console.log(error));
  };

  const onCancelClick = () => {
    // TODO: Add 'are you sure...' question
    refreshItems();
    navigate("/");
  };

  return (
    <>
      {newTasks.length === 0 && newEvents.length === 0 ? (
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
            secondaryAction={onCancelClick}
          />
          <ScheduleItemsList
            items={newTasks}
            type={ItemType.TASK}
            onDeleteClick={removeItem}
          />
          <ScheduleItemsList
            items={newEvents}
            type={ItemType.EVENT}
            onDeleteClick={removeItem}
          />
        </>
      )}
      <Link to="/add-task">
        <button>Add</button>
      </Link>
    </>
  );
};

export default NewItemsListPage;

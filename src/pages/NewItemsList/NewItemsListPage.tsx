import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import { ItemType } from "../../utils/constants";
import { instanceOfTask } from "../../utils/typeChecks";
import CollapseHeader from "../../components/CollapseHeader/CollapseHeader";

const NewItemsListPage = () => {
  const { newTasks, newEvents, removeItem, refreshItems } =
    useNewItemsContext();
  const { setToolbar } = useToolbar();
  const navigate = useNavigate();

  useEffect(() => {
    setToolbar("My New Added Tasks and Events", false);
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

  const onItemClick = (id: number) => {
    console.log("click");
    const item =
      newTasks.find((task) => task.id === id) ||
      newEvents.find((event) => event.id === id);
    if (instanceOfTask(item)) {
      navigate("/display-task", {
        state: {
          task: item as ITask,
          isFromDb: false,
        },
      });
    } else {
      navigate("/display-event", {
        state: {
          event: item as IEvent,
          isFromDb: false,
        },
      });
    }
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

          {newTasks.length !== 0 && (
            <CollapseHeader headerText="Tasks">
              <ScheduleItemsList
                items={newTasks}
                onDeleteClick={removeItem}
                onItemClick={onItemClick}
              />
            </CollapseHeader>
          )}

          {newEvents.length !== 0 && (
            <CollapseHeader headerText="Events">
              <ScheduleItemsList
                items={newEvents}
                onDeleteClick={removeItem}
                onItemClick={onItemClick}
              />
            </CollapseHeader>
          )}
        </>
      )}
      <Link to="/add-task">
        <button>Add</button>
      </Link>
    </>
  );
};

export default NewItemsListPage;

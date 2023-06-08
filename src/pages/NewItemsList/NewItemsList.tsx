import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import { ItemType } from "../../utils/constants";
import { instanceOfEvent, instanceOfTask } from "../../utils/typeChecks";
import CollapseHeader from "../../components/CollapseHeader/CollapseHeader";

const NewItemsList = () => {
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
    const item =
      newTasks.find((task) => task.id === id) ||
      newEvents.find((event) => event.id === id);
    if (instanceOfTask(item)) {
      navigate("/display-task", {
        state: {
          taskId: item.id,
          isFromDb: false,
        },
      });
    } else if (instanceOfEvent(item)) {
      navigate("/display-event", {
        state: {
          eventId: item.id,
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
              <ScheduleItemsList items={newTasks} onDeleteClick={removeItem} />
            </CollapseHeader>
          )}

          {newEvents.length !== 0 && (
            <CollapseHeader headerText="Events">
              <ScheduleItemsList items={newEvents} onDeleteClick={removeItem} />
            </CollapseHeader>
          )}
        </>
      )}
    </>
  );
};

export default NewItemsList;

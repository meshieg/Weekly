import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { ScheduleService } from "../../services/schedule.service";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import { ItemType } from "../../utils/constants";
import { instanceOfEvent, instanceOfTask } from "../../utils/typeChecks";
import CollapseHeader from "../../components/CollapseHeader/CollapseHeader";
import "./NewItemsList.css";
import Loading from "../../components/Loading/Loading";
import MessageDialog from "../../components/MessageDialog/MessageDialog";
import { serverError, USER_MESSAGES } from "../../utils/messages";
import { useAppContext } from "../../contexts/AppContext";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import useAlert from "../../customHooks/useAlert";

const NewItemsList = () => {
  const { newTasks, newEvents, removeItem, refreshItems } =
    useNewItemsContext();
  const { setToolbar } = useToolbar();
  const navigate = useNavigate();
  const { setLoading, setPopupMessage, popupMessage } = useAppContext();
  const { setAlert } = useAlert();

  useEffect(() => {
    setToolbar("My New Added Tasks and Events", false);
  }, []);

  const scheduleItems = () => {
    // set the new items' id to 0 so it won't change existing items on DB
    const taskToAdd = newTasks.map((task) => {
      return { ...task, id: 0 };
    });
    const eventsToAdd = newEvents.map((event) => {
      return { ...event, id: 0 };
    });

    setLoading(true);

    ScheduleService.generateSchedule(taskToAdd, eventsToAdd)
      .then((data: any) => {
        if (data?.notAssignedTasks && data?.notAssignedTasks.length > 0) {
          setPopupMessage(USER_MESSAGES.SCHEDULE_GENERATE_SUCCESS_WITH_MESSAGE);
        } else if (data?.assignedTasks && data?.assignedTasks.length > 0) {
          setPopupMessage(USER_MESSAGES.SCHEDULE_GENERATE_SUCCESS);
        }
      })
      .catch((error) => {
        setPopupMessage(serverError(error?.response.data.errors[0]));
      })
      .finally(() => {
        setLoading(false);
        refreshItems();
        navigate("/");
      });
  };

  const onCancelClick = () => {
    setPopupMessage(USER_MESSAGES.NEW_ITEMS_CANCEL_MESSAGE);
  };

  const onCancelYesClick = () => {
    setPopupMessage(undefined);
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

  const onDeleteItem = (itemId: number) => {
    removeItem(itemId);
    setAlert("success", "Item deleted successfully");
  };

  return (
    <>
      {newTasks.length === 0 && newEvents.length === 0 ? (
        <div className="new-items__message">
          <h3>
            You have no new items to save :/ <br />
            But you can always add them here :)
          </h3>
          <button
            className="btn btn__primary new-items__return-button"
            onClick={() => navigate("/")}
          >
            Return back to my schedule
          </button>
        </div>
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
                onDeleteClick={onDeleteItem}
                onItemClick={onItemClick}
              />
            </CollapseHeader>
          )}

          {newEvents.length !== 0 && (
            <CollapseHeader headerText="Events">
              <ScheduleItemsList
                items={newEvents}
                onDeleteClick={onDeleteItem}
                onItemClick={onItemClick}
              />
            </CollapseHeader>
          )}
        </>
      )}

      <AlertPopup />
      <MessageDialog
        open={popupMessage !== undefined}
        onClose={() => {
          setPopupMessage(undefined);
        }}
        title={popupMessage?.title}
        message={popupMessage?.message}
        extraMessage={popupMessage?.extraMessage}
        primaryButtonText={popupMessage?.primaryButtonText}
        secondaryButtonText={popupMessage?.secondaryButtonText}
        icon={popupMessage?.icon}
        primaryButtonAction={onCancelYesClick}
        secondaryButtonAction={() => setPopupMessage(undefined)}
      />
    </>
  );
};

export default NewItemsList;

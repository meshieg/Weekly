import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useToolbar from "../../customHooks/useToolbar";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { TextField } from "@mui/material";
import Tag from "../../components/Tag/Tag";
import { PriorityLabels } from "../../utils/constants";
import { EventService } from "../../services/event.service";
import { instanceOfEvent } from "../../utils/typeChecks";
import MessageDialog from "../../components/MessageDialog/MessageDialog";
import { USER_MESSAGES } from "../../utils/messages";
import { useAppContext } from "../../contexts/AppContext";
import Loading from "../../components/Loading/Loading";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const textFieldStyle = {
  margin: "1rem 0",
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
  },
};

const DisplayEventPage = () => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  const { setToolbar } = useToolbar();
  const { removeItem, getById } = useNewItemsContext();
  const [eventToShow, setEventToShow] = useState<IEvent | undefined>();
  const eventId: number = navLocation.state?.eventId;
  const { setPopupMessage, popupMessage } = useAppContext();
  const [dataLoading, setDataLoading] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    console.log(navLocation.state);
    setToolbar("Event Details", true);
    if (navLocation.state?.isFromDB) {
      setDataLoading(true);
      EventService.getEventById(eventId)
        .then((event) => {
          setEventToShow(event as IEvent);
        })
        .finally(() => setDataLoading(false));
    } else {
      const event = getById(eventId);
      if (event && instanceOfEvent(event)) setEventToShow(event as IEvent);
    }
  }, []);

  const navToEdit = () => {
    navigate("/add-event", {
      state: { event: eventToShow, isFromDB: navLocation.state?.isFromDB },
    });
  };

  const deleteEvent = () => {
    setPopupMessage(undefined);
    if (navLocation.state?.isFromDB) {
      EventService.deleteEvent(eventId)
        .then((deleted) => {
          if (deleted) {
            setAlert("success", "Event deleted successfully");
            navigate(-1);
          } else {
            setAlert("error", "Failed to delete event");
          }
        })
        .catch(() => {
          setAlert("error", "Failed to delete event");
        });
    } else {
      removeItem(eventId);
      navigate(-1);
    }
  };

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <>
      {eventToShow === undefined ? (
        <>nothing to show</>
      ) : (
        <div className="pageContainer">
          <div className="fieldsContainer">
            <TextField
              value={eventToShow.title}
              disabled={true}
              label="Title"
              variant="standard"
              sx={textFieldStyle}
              inputProps={{ style: { color: "black" } }}
            />
            <TextField
              value={eventToShow.location === "" ? " " : eventToShow.location}
              disabled={true}
              label="Location"
              variant="standard"
              sx={textFieldStyle}
            />
            <div className="dateRowContainer">
              <TextField
                value={eventToShow.startTime.toLocaleDateString()}
                disabled={true}
                label="Start date"
                variant="standard"
                sx={textFieldStyle}
              />
              <TextField
                value={eventToShow.startTime.toLocaleTimeString()}
                disabled={true}
                label="Start time"
                variant="standard"
                sx={textFieldStyle}
              />
            </div>
            <div className="dateRowContainer">
              <TextField
                value={eventToShow.endTime.toLocaleDateString()}
                disabled={true}
                label="End date"
                variant="standard"
                sx={textFieldStyle}
              />
              <TextField
                value={eventToShow.endTime.toLocaleTimeString()}
                disabled={true}
                label="End time"
                variant="standard"
                sx={textFieldStyle}
              />
            </div>
            <TextField
              value={
                eventToShow.description === "" ? " " : eventToShow.description
              }
              multiline
              disabled={true}
              label="Description"
              variant="standard"
              sx={textFieldStyle}
            />
            <Tag
              width="2.8rem"
              label={eventToShow.tag?.name}
              color={eventToShow.tag?.color}
            />
          </div>
          <div className="btnContainer">
            <button
              className="btn btn__primary display__button"
              onClick={navToEdit}
            >
              Edit
            </button>
            <button
              className="btn btn__primary display__button"
              onClick={() =>
                setPopupMessage(USER_MESSAGES.DELETE_CONFIRMATION_MESSAGE)
              }
              style={{ background: "#d32f2f", border: "#d32f2f" }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

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
        primaryButtonAction={deleteEvent}
        secondaryButtonAction={() => setPopupMessage(undefined)}
      />
    </>
  );
};
export default DisplayEventPage;

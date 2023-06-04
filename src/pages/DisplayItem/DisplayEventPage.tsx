import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useToolbar from "../../customHooks/useToolbar";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { TextField } from "@mui/material";
import Tag from "../../components/Tag/Tag";
import { PriorityLabels } from "../../utils/constants";
import { EventService } from "../../services/event.service";

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
  const { removeItem } = useNewItemsContext();
  var eventToShow: IEvent = navLocation.state?.event;

  useEffect(() => {
    setToolbar("Event Details", true);

    if (navLocation.state?.isFromDb) {
      //TODO add request fromDB
    }
  }, []);

  const navToEdit = () => {
    navigate("/add-event", {
      state: { event: eventToShow, isInDB: navLocation.state?.isFromDb },
    });
  };

  const deleteEvent = () => {
    if (navLocation.state?.isFromDB) {
      EventService.deleteEvent(eventToShow.id);
      navigate(-1);
    } else {
      removeItem(eventToShow.id);
      navigate(-1);
    }
  };

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
            <div className="eventDateRowContainer">
              <TextField
                value={eventToShow.startTime.toLocaleDateString()}
                disabled={true}
                label="Start date"
                variant="standard"
                sx={textFieldStyle}
              />
              <TextField
                value={eventToShow.endTime.toLocaleDateString()}
                disabled={true}
                label="End date"
                variant="standard"
                sx={textFieldStyle}
              />
            </div>
            <div className="eventDateRowContainer">
              <TextField
                value={eventToShow.startTime.toLocaleTimeString()}
                disabled={true}
                label="Start time"
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
              onClick={deleteEvent}
              style={{ background: "#d32f2f", border: "#d32f2f" }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default DisplayEventPage;

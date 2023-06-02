import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useToolbar from "../../customHooks/useToolbar";

const DisplayEventPage = () => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  const { setToolbar } = useToolbar();
  var eventToShow: IEvent = navLocation.state?.event;
  var eventId: number = navLocation.state?.id;

  useEffect(() => {
    setToolbar("Event Details", true);

    if (eventId !== undefined) {
      //TODO add request fromDB
    }
  }, []);

  const navToEdit = () => {
    navigate("/add-event", {
      state: { event: eventToShow, isInDB: eventId !== undefined },
    });
  };
  return (
    <div>
      {eventToShow === undefined ? (
        <></>
      ) : (
        <div>
          <span>{eventToShow.title}</span>
          <span>{eventToShow.location}</span>
          <span>{eventToShow.description}</span>
          <button className="btn btn__primary" onClick={navToEdit}>
            Edit
          </button>
          <button className="btn btn__primary" onClick={navToEdit}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default DisplayEventPage;

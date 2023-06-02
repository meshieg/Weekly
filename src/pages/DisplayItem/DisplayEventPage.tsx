import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useToolbar from "../../customHooks/useToolbar";

const DisplayEventPage = () => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  const { setToolbar } = useToolbar();

  useEffect(() => {
    setToolbar("Event Details", true);
  }, []);

  var eventToShow: IEvent = navLocation.state?.event;
  const navToEdit = () => {
    navigate("/add-event", {
      state: { event: eventToShow },
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

import { useLocation, useNavigate } from "react-router";

const DisplayTaskPage = () => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  var taskToShow: IEvent = navLocation.state?.event;
  const navToEdit = () => {
    navigate("/AddTaskPage", {
      state: { task: { ...taskToShow } },
    });
  };
  return (
    <div>
      {taskToShow === undefined ? (
        <></>
      ) : (
        <div>
          <span>{taskToShow.title}</span>
          <span>{taskToShow.location}</span>
          <span>{taskToShow.description}</span>
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
export default DisplayTaskPage;

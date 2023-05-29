import { useLocation, useNavigate } from "react-router";

const DisplayTaskPage = () => {
  const navigate = useNavigate();
  const navLocation = useLocation();
  var taskToShow: ITask = navLocation.state?.task;
  const navToEdit = () => {
    navigate("/add-task", {
      state: { task: taskToShow },
    });
  };
  console.log(taskToShow);
  return (
    <div>
      {taskToShow === undefined ? (
        <>nothing to show</>
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

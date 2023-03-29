import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { ScheduleService } from "../../services/schedule.service";
import { ITaskEntity } from "../../utils/types";
import Task from "../../components/Task/Task";

const Home = () => {
  const [schedule, setSchedule] = useState<ITaskEntity[]>();

  useEffect(() => {
    ScheduleService.getSchedule()
      .then((schedule: ITaskEntity[]) => {
        setSchedule(schedule);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Weekly</h1>
      <Link to="./addTask">
        <button className="btn btn__primary" style={{ margin: "2rem" }}>
          הוסף משימה
        </button>
      </Link>
      <div>
        <text>המשימות והאירועים שלי</text>
        <div>
          {schedule?.map((task) => {
            return <Task task={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import TasksList from "../../components/TasksList/TasksList";
import { TaskService } from "../../services/task.service";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import "./MyTasks.css";

const MyTasks: React.FC = () => {
  const [notDoneTasks, setNotDoneTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [openDone, setOpenDone] = useState<boolean>(true);

  useEffect(() => {
    TaskService.getAllTasks()
      .then((tasks: ITask[]) => {
        setAllTasks(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onTaskCheckedClick = (taskId: number) => {
    TaskService.setDone(taskId)
      .then((newTask: ITask | void) => {
        if (newTask) {
          const newTasks = allTasks.map((task) => {
            if (task.id === newTask.id) {
              return newTask;
            } else {
              return task;
            }
          });

          setAllTasks(newTasks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setNotDoneTasks(allTasks?.filter((task) => task.isDone === false));
    setDoneTasks(allTasks?.filter((task) => task.isDone === true));
  }, [allTasks]);

  const onTaskClick = (id: number) => {
    // TODO: navigate to task details screen
  };

  return (
    <div className="my-tasks">
      <TasksList
        tasks={notDoneTasks}
        onCheckedClick={onTaskCheckedClick}
        onTaskClick={onTaskClick}
      />
      <div className="my-tasks__done" onClick={() => setOpenDone(!openDone)}>
        {openDone ? <ExpandLess /> : <ExpandMore />} Done
      </div>
      <Collapse in={openDone} timeout="auto" unmountOnExit>
        <TasksList tasks={doneTasks} onCheckedClick={onTaskCheckedClick} />
      </Collapse>
    </div>
  );
};

export default MyTasks;

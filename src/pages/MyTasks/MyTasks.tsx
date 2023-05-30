import React, { useEffect, useState } from "react";
import { TaskService } from "../../services/task.service";
import "./MyTasks.css";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import CollapseHeader from "../../components/CollapseHeader/CollapseHeader";

const MyTasks: React.FC = () => {
  const [notDoneTasks, setNotDoneTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [allTasks, setAllTasks] = useState<ITask[]>([]);

  const { setToolbar } = useToolbar();

  useEffect(() => {
    setToolbar("My Tasks", false);

    TaskService.getAllTasks()
      .then((tasks: ITask[]) => {
        setAllTasks(
          tasks?.sort((t1, t2) => t1.dueDate.getTime() - t2.dueDate.getTime())
        );
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
      <ScheduleItemsList
        items={notDoneTasks}
        onCheckedClick={onTaskCheckedClick}
        onItemClick={onTaskClick}
      />
      <CollapseHeader headerText="Done">
        <ScheduleItemsList
          items={doneTasks}
          onCheckedClick={onTaskCheckedClick}
        />
      </CollapseHeader>
    </div>
  );
};

export default MyTasks;

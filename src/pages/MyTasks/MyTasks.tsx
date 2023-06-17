import "./MyTasks.css";
import React, { useEffect, useRef, useState } from "react";
import { TaskService } from "../../services/task.service";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import CollapseHeader from "../../components/CollapseHeader/CollapseHeader";
import { useNavigate } from "react-router-dom";
import { FilterAltOutlined as FilterIcon } from '@mui/icons-material';
import TagsList from "../../components/TagsList/TagsList";
import { TagService } from "../../services/tag.service";

const MyTasks: React.FC = () => {
  const [notDoneTasks, setNotDoneTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [isFilterListOpen, setFilterListOpen] = useState<boolean>(false);
  const [isFilterSet, setFilterState] = useState<boolean>(false);
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setToolbar } = useToolbar();
  const navigate = useNavigate();

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

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if(!dropdownRef?.current?.contains(event.target)) {
        setFilterListOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return() => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownRef]);

  const onTaskClick = (id: number) => {
    const item = allTasks.find((task) => task.id === id);
    if (item !== undefined) {
      navigate("/display-task", {
        state: {
          taskId: item.id,
          isFromDB: true,
        },
      });
    }
  };

  const setFilter = (tag?: ITag) => {
    let filteredTasks = allTasks.filter(task => !task.isDone);
    setFilterState(false);

    if(tag) {    // State of: there is a tag to filter by
      filteredTasks = allTasks.filter(task => task.tag?.id === tag.id && !task.isDone);
      setFilterState(true);
    }
    
    setNotDoneTasks(filteredTasks);
    setFilterListOpen(false);
  }

  const onBtnClick = () => {
    console.log(isFilterListOpen);
    setFilterListOpen(!isFilterListOpen)
    console.log(isFilterListOpen);
  }

  return (
    <>
      <div className="filter__container" ref={dropdownRef}>
        <button className={`filter__button ${isFilterSet && 'active'}`} 
                onClick={() => setFilterListOpen(!isFilterListOpen)}>
          <FilterIcon /> 
        </button>
        <div className={`filter__list ${isFilterListOpen ? 'active' : 'inactive'}`}>
          <TagsList
              tags={tagsList} 
              tagWidth="1.5rem"
              onTagClick={setFilter} />
          <button className="btn btn__secondary" disabled={!isFilterSet} onClick={() => setFilter()}>clear filter</button>
        </div> 
      </div>
      { isFilterSet && notDoneTasks.length === 0 ?
      <div className="no-tasks">No tasks to show</div> :
      <ScheduleItemsList
        items={notDoneTasks}
        onCheckedClick={onTaskCheckedClick}
        onItemClick={onTaskClick}
      />}
      { !isFilterSet ? 
      <CollapseHeader headerText="Done">
        <ScheduleItemsList
          items={doneTasks}
          onCheckedClick={onTaskCheckedClick}
        />
      </CollapseHeader> : <></> }
    </>
  );
};

export default MyTasks;

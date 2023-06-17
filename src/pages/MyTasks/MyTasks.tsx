import "./MyTasks.css";
import React, { useEffect, useRef, useState } from "react";
import { TaskService } from "../../services/task.service";
import useToolbar from "../../customHooks/useToolbar";
import ScheduleItemsList from "../../components/ScheduleItemsList/ScheduleItemsList";
import CollapseHeader from "../../components/CollapseHeader/CollapseHeader";
import { useNavigate } from "react-router-dom";
import useAlert from "../../customHooks/useAlert";
import { FilterAltOutlined as FilterIcon,
         SwapVertOutlined as SortIcon } from '@mui/icons-material';
import TagsList from "../../components/TagsList/TagsList";
import { TagService } from "../../services/tag.service";
import SortList from "../../components/SortList/SortList";
import { DEFAULT_TAG, Direction } from "../../utils/constants";
import { ISortItem, sortItems } from "./SortListItems";

const MyTasks: React.FC = () => {
  const [notDoneTasks, setNotDoneTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const { setAlert } = useAlert();
  const [isFilterListOpen, setFilterListOpen] = useState<boolean>(false);
  const [isFilterSet, setFilterState] = useState<boolean>(false);
  const [isSortSet, setSortState] = useState<boolean>(false);
  const [isSortListOpen, setSortListOpen] = useState<boolean>(false);
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setToolbar } = useToolbar();
  const navigate = useNavigate();

  useEffect(() => {
    setToolbar("My Tasks", false);

    TaskService.getAllTasks()
      .then((tasks: ITask[]) => {
        // setAllTasks(
        //   tasks?.sort((t1, t2) => t1.dueDate.getTime() - t2.dueDate.getTime())
        // );
        setAllTasks(tasks?.sort((t1, t2) => t1.id - t2.id));
      })
      .catch((err) => {
        setAlert("error", "Failed to fetch tasks");
        console.log(err.message);
      });

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
      })
      .catch((err) => {
        setAlert("error", "Failed to fetch tasks");
        console.log(err.message);
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
        setAlert("error", "Something went wrong:( please try again later");
        console.log(err);
      });
  };

  const sortDoneTasks = (tasks: ITask[]) => {
    setNotDoneTasks(tasks?.filter((task) => task.isDone === false));
    setDoneTasks(tasks?.filter((task) => task.isDone === true));
  }

  useEffect(() => {
    sortDoneTasks(allTasks);
  }, [allTasks]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if(!dropdownRef?.current?.contains(event.target)) {
        setFilterListOpen(false);
        setSortListOpen(false);
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
    let filteredTasks = allTasks;
    setFilterState(false);

    if(tag) {    // State of: there is a tag to filter by
      filteredTasks = allTasks.filter(task => 
        {
          if(task.tag?.id === undefined) {
            return tag.id === DEFAULT_TAG.id;
          }
          
          return task.tag?.id === tag.id;
          }
        );
      setFilterState(true);
    }
    
    sortDoneTasks(filteredTasks);
    setFilterListOpen(false);
  }

  // TODO: Make it a generic func
  const setSort = (item: ISortItem) => {
    // sortItems.find(currItem => item.title === currItem.title && item.direction !== currItem.direction ? currItem.active = false : null)
    // sortItems[item.key].active = !sortItems[item.key].active;

    sortItems[item.key].active = !sortItems[item.key].active;
    if(item.active) {
      sortItems.map(currItem => currItem.key !== item.key ? currItem.active = false : null);

      notDoneTasks.sort((a, b) => compareFunc(a, b, item));
      doneTasks.sort((a, b) => compareFunc(a, b, item));
      setSortState(true);
    } else {
      sortDoneTasks(allTasks);
      setSortState(false);
    }

    setSortListOpen(false);
  }

  const compareFunc = (a: ITask, b: ITask, details: ISortItem) => {
    let returnVal = 0;

    switch(details.title) {
      case "due date":
        returnVal = a.dueDate.getTime() - b.dueDate.getTime();
        break;

      case "title":
        returnVal = a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1;
        break;
    }

    if(details.direction === Direction.DESC) {
      returnVal = returnVal * (-1);
    }
    return returnVal;
  }

  const openList = (key: string) => {
    switch (key) {
      case 'SORT':
        setSortListOpen(!isSortListOpen);
        setFilterListOpen(false);
        break;

      case 'FILTER':
        setFilterListOpen(!isFilterListOpen);
        setSortListOpen(false);
        break;
    }
  }

  return (
    <>
      <div className="filter__container" ref={dropdownRef}>
        <button className={`filter__button ${isFilterSet && 'active'}`} 
                onClick={() => openList('FILTER')}>
          <FilterIcon /> 
        </button>
        <div className={`list filter__list ${isFilterListOpen ? 'active' : 'inactive'}`}>
          <TagsList
              tags={tagsList} 
              tagWidth="1.5rem"
              onTagClick={setFilter} />
          <button className="btn btn__secondary" disabled={!isFilterSet} onClick={() => setFilter()}>clear filter</button>
        </div> 
        <button className={`filter__button ${isSortSet && 'active'}`} 
                onClick={() => openList('SORT')}>
          <SortIcon />
        </button>
        <div className={`list sort__list ${isSortListOpen ? 'active' : 'inactive'}`}>
          <SortList
              sortItems={sortItems}
              onRowClick={setSort} />
        </div> 
      </div>
      {notDoneTasks.length === 0 && doneTasks.length === 0 ? 
      <div className="no-tasks">No tasks to show<br/>Try removing the filter :)</div> :
      <>
        <ScheduleItemsList
          items={notDoneTasks}
          onCheckedClick={onTaskCheckedClick}
          onItemClick={onTaskClick}
          showNoAssignmentIndication={true}
        />
        <CollapseHeader headerText="Done">
          <ScheduleItemsList
            items={doneTasks}
            onCheckedClick={onTaskCheckedClick}
          />
        </CollapseHeader>
      </> }
    </>
  );
};

export default MyTasks;

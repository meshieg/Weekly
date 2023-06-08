import { useState } from "react";
import { NewItemsContext } from "./NewItemsContext";
import { instanceOfEvent, instanceOfTask } from "../../utils/typeChecks";

interface IProps {
  children: React.ReactNode;
}

export const NewItemsProvider: React.FC<IProps> = ({ children }) => {
  const [newTasks, setNewTasks] = useState<ITask[]>([]);
  const [newEvents, setNewEvents] = useState<IEvent[]>([]);
  const [id, setId] = useState<number>(0);

  const addItem = (newItem: ITask | IEvent) => {
    newItem.id = id;

    instanceOfTask(newItem)
      ? setNewTasks((prevArray) => [...prevArray, newItem])
      : setNewEvents((prevArray) => [...prevArray, newItem]);

    setId(id + 1);
  };

  const removeItem = (itemId: number) => {
    const tasksCopy = newTasks.filter((task) => task.id !== itemId);
    const eventsCopy = newEvents.filter((event) => event.id !== itemId);

    setNewTasks(tasksCopy);
    setNewEvents(eventsCopy);
  };

  const updateItem = (item: ITask | IEvent) => {
    if (instanceOfTask(item)) {
      newTasks[newTasks.findIndex((task) => task.id === item.id)] = item;
    } else if (instanceOfEvent(item)) {
      newEvents[newEvents.findIndex((event) => event.id === item.id)] = item;
    }
  };

  const getById = (itemId: number) => {
    return (
      newTasks.find((task) => {
        return task.id === itemId;
      }) ||
      newEvents.find((event) => {
        return event.id === itemId;
      })
    );
  };

  const refreshItems = () => {
    setNewTasks([]);
    setNewEvents([]);
    setId(0);
  };

  return (
    <NewItemsContext.Provider
      value={{
        newTasks,
        newEvents,
        addItem,
        removeItem,
        updateItem,
        refreshItems,
        getById,
      }}
    >
      {children}
    </NewItemsContext.Provider>
  );
};

export default NewItemsContext;

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
    
    instanceOfTask(newItem) ? setNewTasks(prevArray => [...prevArray, newItem])
      : setNewEvents(prevArray => [...prevArray, newItem]);

    setId(id+1);
  }
  
  const removeItem = (itemId: number) => {
    const tasksCopy = newTasks.filter(task => task.id !== itemId);
    const eventsCopy = newEvents.filter(event => event.id !== itemId);

    setNewTasks(tasksCopy);
    setNewEvents(eventsCopy);
  }

  const updateItem = (item: ITask | IEvent) => {
    newTasks.map(task => {
      if (task.id === id && instanceOfTask(item)) {
        task = item;
      }
      return task;
    });

    newEvents.map(event => {
      if (event.id === id && instanceOfEvent(item)) {
        event = item;
      }
      return event;
    });
  }

  const refreshItems = () => {
    setNewTasks([]);
    setNewEvents([]);
    setId(0);
  }
  
  return (
    <NewItemsContext.Provider
      value={{
        newTasks,
        newEvents,
        addItem,
        removeItem,
        updateItem,
        refreshItems,
      }}
    >{children}</NewItemsContext.Provider>
  )};
  
  export default NewItemsContext;

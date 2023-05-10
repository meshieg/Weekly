import { useState } from "react";
import { NewItemsContext } from "./NewItemsContext";

interface IProps {
  children: React.ReactNode;
}

export const NewItemsProvider: React.FC<IProps> = ({ children }) => {
    const [newTasks, setNewTasks] = useState<ITask[]>([]);
    const [newEvents, setNewEvents] = useState<IEvent[]>([]);
    const [id, setId] = useState<number>(0);
  
    // TODO: Distinct between task and event in the same function rather than different ones...
  //   const addItem = (newItem: ITask | IEvent, itemType: string) => {
  //     newItem.id = id;
  //     setNewTasks(prevArray => [...prevArray, newItem]);
  //     setId(id+1);
  // }

    const addTask = (newTask: ITask) => {
    newTask.id = id;
    setNewTasks(prevArray => [...prevArray, newTask]);
    setId(id+1);
  }

  const addEvent = (newEvent: IEvent) => {
    newEvent.id = id;
    setNewEvents(prevArray => [...prevArray, newEvent])
  }
  
  const removeItem = (itemId: number) => {
    const tasksCopy = newTasks.filter(task => task.id !== itemId);
    setNewTasks(tasksCopy);
  }

  const refreshItems = () => {
    setNewTasks([]);
  }
  
  return (
    <NewItemsContext.Provider
      value={{
        newTasks,
        newEvents,
        addTask,
        addEvent,
        removeItem,
        refreshItems,
        // addItem
      }}
    >{children}</NewItemsContext.Provider>
  )};
  
  export default NewItemsContext;

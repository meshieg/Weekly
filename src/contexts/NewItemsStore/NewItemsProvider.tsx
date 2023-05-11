import { useState } from "react";
import { NewItemsContext } from "./NewItemsContext";
import { instanceOfTask } from "../../utils/typeChecks";

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

  const refreshItems = () => {
    setNewTasks([]);
    setNewEvents([]);
  }
  
  return (
    <NewItemsContext.Provider
      value={{
        newTasks,
        newEvents,
        addItem,
        removeItem,
        refreshItems,
      }}
    >{children}</NewItemsContext.Provider>
  )};
  
  export default NewItemsContext;

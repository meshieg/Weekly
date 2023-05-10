import { createContext, useContext } from "react";

interface INewItemsContext {
    newTasks: ITask[];
    newEvents: IEvent[];
    addTask: (newTask: ITask) => void,
    addEvent: (newEvent: IEvent) => void,
    removeItem: (itemId: number) => void;
    refreshItems: () => void;

    // addItem: (newItem: ITask | IEvent, itemType: string) => void;
}

const defaultValues: INewItemsContext = {
    newTasks: [],
    newEvents: [],
    addTask: (newTask: ITask) => {},
    addEvent: (newEvent: IEvent) => {},
    removeItem: (itemId: number) => {},
    refreshItems: () => {}

    // // TODO: Distinct between task and event in the same function...
    // addItem: (newItem: ITask | IEvent, itemType: string) => {},
}

export const NewItemsContext = createContext(defaultValues);
export const useNewItemsContext = (): INewItemsContext => useContext(NewItemsContext);
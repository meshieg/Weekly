import { createContext, useContext } from "react";

interface INewItemsContext {
    newTasks: ITask[];
    newEvents: IEvent[];
    addItem: (newItem: ITask | IEvent) => void;
    removeItem: (itemId: number) => void;
    updateItem: (item: ITask | IEvent) => void;
    refreshItems: () => void;
}

const defaultValues: INewItemsContext = {
    newTasks: [],
    newEvents: [],
    addItem: (newItem: ITask | IEvent) => {},
    removeItem: (itemId: number) => {},
    updateItem: (item: ITask | IEvent) => {},
    refreshItems: () => {}
}

export const NewItemsContext = createContext(defaultValues);
export const useNewItemsContext = (): INewItemsContext => useContext(NewItemsContext);
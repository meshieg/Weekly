import { createContext, useContext } from "react";

interface INewItemsContext {
  newTasks: ITask[];
  newEvents: IEvent[];
  addItem: (newItem: ITask | IEvent) => void;
  removeItem: (itemId: number) => void;
  updateItem: (item: ITask | IEvent) => void;
  refreshItems: () => void;
  getById: (itemId: number) => ITask | IEvent | undefined;
}

const defaultValues: INewItemsContext = {
  newTasks: [],
  newEvents: [],
  addItem: (newItem: ITask | IEvent) => {},
  removeItem: (itemId: number) => {},
  updateItem: (item: ITask | IEvent) => {},
  refreshItems: () => {},
  getById: (itemId: number) => {
    return {} as ITask;
  },
};

export const NewItemsContext = createContext(defaultValues);
export const useNewItemsContext = (): INewItemsContext =>
  useContext(NewItemsContext);

export const NewItemsContext = createContext(defaultValues);
export const useNewItemsContext = (): INewItemsContext =>
  useContext(NewItemsContext);

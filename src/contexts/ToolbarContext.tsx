import React from "react";
import { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IToolbar {
  title: string;
  show: boolean;
  backButton: boolean;
}

const initialState: IToolbar = {
  title: "Weekly",
  show: true,
  backButton: false,
};

const ToolbarContext = createContext({
  toolbar: initialState,
  setToolbar: (title: string, backButton?: boolean) => {},
  hideToolbar: () => {},
  clearToolbar: () => {},
});

export const ToolbarProvider: React.FC<IProps> = ({ children }) => {
  const [toolbarState, setToolbarState] = useState<IToolbar>(initialState);

  const setToolbar = (title: string, backButton?: boolean) => {
    setToolbarState({
      title,
      show: true,
      backButton: backButton != undefined ? backButton : false,
    });
  };

  const hideToolbar = () => {
    setToolbarState({
      ...initialState,
      show: false,
    });
  };

  const clearToolbar = () => {
    setToolbarState({
      ...initialState,
    });
  };

  return (
    <ToolbarContext.Provider
      value={{
        toolbar: toolbarState,
        setToolbar,
        hideToolbar,
        clearToolbar,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

export default ToolbarContext;

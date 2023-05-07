import React from "react";
import { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IToolbar {
  title: string;
  backButton: boolean;
}

const initialState: IToolbar = {
  title: "Weekly",
  backButton: false,
};

const ToolbarContext = createContext({
  toolbar: initialState,
  setToolbar: (title: string, backButton?: boolean) => {},
  clearToolbar: () => {},
});

export const ToolbarProvider: React.FC<IProps> = ({ children }) => {
  const [toolbarState, setToolbarState] = useState<IToolbar>(initialState);

  const setToolbar = (title: string, backButton?: boolean) => {
    setToolbarState({
      title,
      backButton: backButton != undefined ? backButton : false,
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
        clearToolbar,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

export default ToolbarContext;

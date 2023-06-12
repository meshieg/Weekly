import React, { useContext } from "react";
import { createContext, useState } from "react";
import { UserMessage } from "../utils/types";

interface IProps {
  children: React.ReactNode;
}

interface IAppContext {
  loading: boolean;
  popupMessage?: UserMessage;
  setLoading: (loading: boolean) => void;
  setPopupMessage: (message: UserMessage | undefined) => void;
}

const AppContext = createContext<IAppContext>({
  loading: false,
  popupMessage: undefined,
  setLoading: (loading: boolean) => {},
  setPopupMessage: (message: UserMessage | undefined) => {},
});

export const AppProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<UserMessage>();

  return (
    <AppContext.Provider
      value={{
        loading,
        popupMessage: message,
        setLoading,
        setPopupMessage: setMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export const useAppContext = (): IAppContext => useContext(AppContext);

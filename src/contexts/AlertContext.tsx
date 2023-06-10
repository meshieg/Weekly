import React from "react";
import { AlertColor } from "@mui/material";
import { createContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IAlert {
  type: AlertColor | undefined;
  text: string;
}

const ALERT_TIME = 3000;

const initialState: IAlert = {
  type: undefined,
  text: "",
};

const AlertContext = createContext({
  alert: initialState,
  setAlert: (type: AlertColor, text: string) => {},
});

export const AlertProvider: React.FC<IProps> = ({ children }) => {
  const [alertState, setAlertState] = useState<IAlert>(initialState);

  const setAlert = (type: AlertColor, text: string) => {
    setAlertState({ type: type, text: text });

    setTimeout(() => {
      setAlertState(initialState);
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: alertState,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;

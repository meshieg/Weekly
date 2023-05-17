import { Alert } from "@mui/material";
import useAlert from "../../customHooks/useAlert";

const AlertPopup = () => {
  const { alert } = useAlert();

  if (alert.text && alert.type) {
    return (
      <Alert
        severity={alert.type}
        sx={{
          position: "fixed",
          zIndex: 10,
          top: "5em",
          width: "21.5em",
        }}
      >
        {alert.text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;

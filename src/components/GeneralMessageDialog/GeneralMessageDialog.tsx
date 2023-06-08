import React from "react";
import { Dialog, IconButton, Zoom } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import "./GeneralMessageDialog.css";

import { ReactComponent as WarningSign } from "../../assets/icons/warningSign.svg";

interface IGeneralMessageDialogProps {
  open: boolean;
  onClose: () => void;
  icon?: JSX.Element;
  children: React.ReactElement;
}

const GeneralMessageDialog: React.FC<IGeneralMessageDialogProps> = (props) => {
  const { open, onClose, children, icon = <WarningSign /> } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var( --primary-bg-color)",
        },
      }}
      TransitionComponent={Zoom}
    >
      <IconButton
        onClick={props.onClose}
        sx={{ position: "absolute", left: 0, top: 0 }}
      >
        <ClearIcon />
      </IconButton>
      <div className="popup__icon">{icon}</div>
      <div className="popup__content">{children}</div>
    </Dialog>
  );
};

export default GeneralMessageDialog;

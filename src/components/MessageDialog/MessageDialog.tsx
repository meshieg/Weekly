import React, { ReactFragment } from "react";
import GeneralDialog from "../GeneralDialog/GeneralDialog";
import "./MessageDialog.css";

import { ReactComponent as SuccessIcon } from "../../assets/icons/successIcon.svg";
import { UserMessage } from "../../utils/types";

export interface IMessageDialogProps extends UserMessage {
  open: boolean;
  onClose: () => void;
}

const MessageDialog: React.FC<IMessageDialogProps> = (props) => {
  return (
    <GeneralDialog open={props.open} onClose={props.onClose} icon={props.icon}>
      <div>
        {props.title && (
          <h3 className="message-dialog__title">{props.title}</h3>
        )}
        {props.message && (
          <div className="message-dialog__message">{props.message}</div>
        )}
        {/* <br />
        <br /> */}
        {props.extraMessage && (
          <div className="message-dialog__extra-message">
            {props.extraMessage}
          </div>
        )}
        {/* </div> */}
        <div className="message-dialog__buttons">
          {props.primaryButtonText && (
            <button
              className="btn btn__primary message-dialog_btn"
              onClick={props.primaryButtonAction}
            >
              {props.primaryButtonText}
            </button>
          )}
          {props.secondaryButtonText && (
            <button
              className="btn btn__secondary message-dialog_btn"
              onClick={props.secondaryButtonAction}
            >
              {props.secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </GeneralDialog>
  );
};

export default MessageDialog;

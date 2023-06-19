import React from "react";
import ActionButtons from "../ActionButtons/ActionButtons";
import GeneralDialog from "../GeneralDialog/GeneralDialog";
import "./AlgoMessagePopup.css";

interface IAlgoMessagePopupProps {
  open: boolean;
  onClose: () => void;
  primaryAction: () => void;
  secondaryAction: () => void;
}

const AlgoMessagePopup: React.FC<IAlgoMessagePopupProps> = (props) => {
  return (
    <GeneralDialog open={props.open} onClose={props.onClose}>
      <div className="">
        <div className="algo-popup__text">
          We noticed that you updated data that could affect your schedule...
          <br />
          <br />
          <b>Would you like us to regenerate it for you?</b>
        </div>
        <div className="algo-popup__buttons">
          <button
            className="btn btn__primary"
            onClick={props.primaryAction}
          >
            Yes, regenerate!
          </button>
          <button
            className="btn btn__secondary"
            onClick={props.secondaryAction}
          >
            No, I'll do it myself
          </button>
        </div>
      </div>
    </GeneralDialog>
  );
};

export default AlgoMessagePopup;

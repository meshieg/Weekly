import React from "react";
import ActionButtons from "../ActionButtons/ActionButtons";
import GeneralMessageDialog from "../GeneralMessageDialog/GeneralMessageDialog";
import "./AlgoMessagePopup.css";

interface IAlgoMessagePopupProps {
  open: boolean;
  onClose: () => void;
  primaryAction: () => void;
  secondaryAction: () => void;
}

const AlgoMessagePopup: React.FC<IAlgoMessagePopupProps> = (props) => {
  return (
    <GeneralMessageDialog open={props.open} onClose={props.onClose}>
      <div className="">
        <div className="algo-popup__text">
          We noticed that you updated data that could affect your schedule...
          <br />
          <br />
          <b>Would you like us to regenerate it for you?</b>
        </div>
        <div className="algo-popup__buttons">
          <button
            className="btn btn__primary algo-popup_btn"
            onClick={props.primaryAction}
          >
            Yes, regenerate!
          </button>
          <button
            className="btn btn__secondary algo-popup_btn"
            onClick={props.secondaryAction}
          >
            No, I'll do it myself
          </button>
        </div>
      </div>
    </GeneralMessageDialog>
  );
};

export default AlgoMessagePopup;

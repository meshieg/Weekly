import React from "react";
import ActionButtons from "../ActionButtons/ActionButtons";
import GeneralMessageDialog from "../GeneralMessageDialog/GeneralMessageDialog";
import "./AlgoMessagePopup.css";

interface IAlgoMessagePopupProps {
  open: boolean;
  onClose: () => void;
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
          <ActionButtons
            primaryText="Yes, regenerate!"
            secondaryText="No, I'll do it myself"
            primaryAction={() => {}}
            secondaryAction={() => {}}
          />
        </div>
      </div>
    </GeneralMessageDialog>
  );
};

export default AlgoMessagePopup;

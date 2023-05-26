import './ActionButtons.css';

interface IActionButtonsProps {
    primaryText: string;
    secondaryText: string;
    primaryAction: () => void;
    secondaryAction: () => void;
}

const ActionButtons = (props: IActionButtonsProps) => {
    return (
        <div className="buttons_panel">
          <button className="btn btn__primary action-btn" onClick={props.primaryAction}>
            {props.primaryText}
          </button>
          <button className="btn btn__secondary action-btn" onClick={props.secondaryAction}>
            {props.secondaryText}
          </button>
        </div>
    );
};

export default ActionButtons;
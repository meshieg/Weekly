import React, { ReactElement } from "react";
import { NavigateNext as Arrow } from '@mui/icons-material';
import "./ProfileActionRow.css";

interface IProfileActionRowProps {
  icon?: ReactElement;
  text: string;
  displayArrow?: boolean;
  onItemClick: () => void;
  color?: string;
}

const ProfileActionRow: React.FC<IProfileActionRowProps> = ({
    icon = <></>,
    text,
    displayArrow = true,
    onItemClick,
    color = "black"
}) => {

  return (
    <div className="action-row" onClick={onItemClick} style={{color: color}}>
        <div className="action-row-details">
            {icon}
            <p>{text}</p>
        </div>
        {displayArrow ? <Arrow /> : <></>}
    </div>
  );
};

export default React.memo(ProfileActionRow);

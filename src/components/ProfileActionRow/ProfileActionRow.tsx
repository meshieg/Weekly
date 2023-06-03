import "./ProfileActionRow.css";
import React from "react";
import { NavigateNext as Arrow } from '@mui/icons-material';
import { IProfileAction } from "../../utils/types";

interface IProfileActionRowProps {
    action: IProfileAction;
    onItemClick: (id: number) => void;
    color?: string;
}

const ProfileActionRow: React.FC<IProfileActionRowProps> = ({
    action: {
        id,
        icon = <></>,
        text,
        displayArrow = true
    },
    onItemClick,
    color = "black"
}) => {

  return (
    <div className="action-row" onClick={() => onItemClick(id)} style={{color: color}}>
        <div className="action-row-details">
            {icon}
            <p>{text}</p>
        </div>
        {displayArrow ? <Arrow /> : <></>}
    </div>
  );
};

export default React.memo(ProfileActionRow);

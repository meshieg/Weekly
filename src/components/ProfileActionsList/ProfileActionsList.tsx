import "./ProfileActionsList.css";
import ProfileActionRow from "../../components/ProfileActionRow/ProfileActionRow";
import { IProfileAction } from "../../utils/types";

interface IProfileActionsListProps {
    actions: IProfileAction[]
    onItemClick: () => void;
    color?: string
}

const ProfileActionsList: React.FC<IProfileActionsListProps> = ({actions, onItemClick, color}) => {
    return (
        <div className="actions-list">
            {actions.map(actions => {
                return (
                    <>
                        <ProfileActionRow
                            icon={actions.icon} 
                            text={actions.text} 
                            onItemClick={onItemClick} 
                            displayArrow={actions.displayArrow}
                            color={color} />
                        <hr />
                    </>
                )
            })}
        </div>
    );
};

export default ProfileActionsList;

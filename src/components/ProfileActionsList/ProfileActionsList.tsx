import "./ProfileActionsList.css";
import ProfileActionRow from "../../components/ProfileActionRow/ProfileActionRow";
import { IProfileAction } from "../../utils/types";

interface IProfileActionsListProps {
    actions: IProfileAction[]
    onItemClick: (id: number) => void;
    color?: string
}

const ProfileActionsList: React.FC<IProfileActionsListProps> = ({actions, onItemClick, color}) => {
    return (
        <div className="actions-list">
            {actions.map(action => {
                return (
                    <div key={action.id}>
                        <ProfileActionRow
                            action={action}
                            onItemClick={onItemClick} 
                            color={color} />
                        <hr />
                    </div>
                )
            })}
        </div>
    );
};

export default ProfileActionsList;

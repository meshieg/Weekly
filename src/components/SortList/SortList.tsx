import "./SortList.css";
import {sortItems, ISortItem} from "../../pages/MyTasks/SortListItems";

interface ISortListProps {
    sortItems: ISortItem[];
    onRowClick: (item: ISortItem) => void;
};

const SortList: React.FC<ISortListProps> = ({onRowClick}) => {
    return (
        <div>
            {sortItems.map(item => {
                return (
                    <div key={item.key}     
                         className={`sort__item ${item.active && 'active'}`} 
                         onClick={() => onRowClick(item)}>
                        {item.icon}
                        {item.title} - {item.direction}
                    </div>
                )
            })}
        </div>
    );
}

export default SortList;
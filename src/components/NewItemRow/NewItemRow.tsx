import { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import "./NewItemRow.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ItemType } from "../../utils/constants";
import { instanceOfTask } from "../../utils/typeChecks";

interface INewItemRowProps {
  item: ITask | IEvent;
  onRemoveItem: (taskId: number) => void;
}

const NewItemRow = ({ item, onRemoveItem }: INewItemRowProps) => {
  const [itemType, setItemType] = useState<string>("");
  const [displayDate, setDisplayDate] = useState<Date>(new Date());

  useEffect(() => {
    if(instanceOfTask(item)) {
      setDisplayDate(item.dueDate);
      setItemType(ItemType.TASK);
    } else {
      setDisplayDate(item.endTime);
      setItemType(ItemType.EVENT);
    }
  }, [item]);

  return (
    <div className="task-row">
      <Tag width="2.2rem" color={item.tag?.color} />
      <div className="task-row__details">
        <div className="task-row__info">
          <h3 className="task-row__title">
            {itemType}: {item.title}
            {/* {itemType === ItemType.TASK ? item.title : } */}
          </h3>
          <div>{displayDate.toLocaleDateString("en-GB")}</div>
        </div>
        <DeleteOutlinedIcon onClick={() => onRemoveItem(item.id)} />
      </div>
    </div>
  );
};

export default NewItemRow;

import React from "react";
import { ItemType } from "../../utils/constants";
import ScheduleItemRow from "../ScheduleItemRow/ScheduleItemRow";

interface IScheduleItemsListProps {
  items: ITask[] | IEvent[];
  type: ItemType;
  onCheckedClick?: (taskId: number) => void;
  onItemClick?: (taskId: number) => void;
  onDeleteClick?: (taskId: number) => void;
}

const ScheduleItemsList: React.FC<IScheduleItemsListProps> = (props) => {
  return (
    <div style={{ margin: "0 1rem" }}>
      {props.items?.map((item) => {
        return (
          <ScheduleItemRow
            key={item.id}
            id={item.id}
            title={item.title}
            date={
              props.type === ItemType.TASK
                ? (item as ITask).dueDate
                : (item as IEvent).startTime
            }
            tag={item.tag}
            isDone={
              props.type === ItemType.TASK ? (item as ITask).isDone : undefined
            }
            displayTime={props.type === ItemType.TASK ? false : true}
            checkbox={props.onCheckedClick ? true : false}
            onCheckedClick={props.onCheckedClick}
            onClick={props.onItemClick}
            onDeleteClick={props.onDeleteClick}
          />
        );
      })}
    </div>
  );
};

export default ScheduleItemsList;

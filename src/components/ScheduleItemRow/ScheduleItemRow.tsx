import { Checkbox, checkboxClasses, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import EditIcon from "@mui/icons-material/Edit";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import React from "react";
import Tag from "../Tag/Tag";
import "./ScheduleItemRow.css";

interface IScheduleItemRowProps {
  id: number;
  title: string;
  date: Date;
  tag?: ITag;
  isDone?: boolean;
  displayTime?: boolean;
  checkbox?: boolean;
  onCheckedClick?: (id: number) => void;
  onClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
}

const ScheduleItemRow: React.FC<IScheduleItemRowProps> = (props) => {
  return (
    <div
      className={props.isDone ? "item item__done" : "item"}
      onClick={() => props.onClick?.(props.id)}
    >
      <div className="item__info">
        {props.checkbox && (
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 30 },
              [`&.${checkboxClasses.checked}`]: {
                color: "var(--primary-color)",
              },
            }}
            checked={props.isDone}
            onClick={(event) => {
              event.stopPropagation();
              props.onCheckedClick?.(props.id);
            }}
          />
        )}
        <Tag width="2.2rem" color={props.tag?.color} />
        <div className="item__details">
          <span className="item__title">{props.title}</span>
          <span
            className="item__date"
            style={{
              color:
                props.date < new Date() && !props.isDone
                  ? "#d91e1e"
                  : undefined,
            }}
          >
            <TodayOutlinedIcon
              sx={{ width: "1.3rem", marginRight: "0.2rem" }}
            />{" "}
            {props.displayTime
              ? props.date?.toLocaleString("en-GB")
              : props.date?.toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>
      <div>
        {/* {props.onEditClick && (
          <IconButton onClick={() => props.onEditClick?.(props.id)}>
            <EditIcon />
          </IconButton>
        )} */}
        {props.onDeleteClick && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              props.onDeleteClick?.(props.id);
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(ScheduleItemRow);

import { Checkbox, checkboxClasses, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import React from "react";

import "./TaskRow.css";
import Tag from "../Tag/Tag";

interface ITaskRowProps {
  id: number;
  title: string;
  date: Date;
  tag?: ITag;
  isDone?: boolean;
  checkbox?: boolean;
  onCheckedClick?: (id: number) => void;
  onClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
}

const TaskRow: React.FC<ITaskRowProps> = (props) => {
  return (
    <div
      className={props.isDone ? "task__item task__done" : "task__item"}
      onClick={() => props.onClick?.(props.id)}
    >
      <div className="task__info">
        {props.checkbox && (
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 30 },
              [`&.${checkboxClasses.checked}`]: {
                color: "var(--primary-color)",
              },
            }}
            checked={props.isDone}
            onClick={() => props.onCheckedClick?.(props.id)}
          />
        )}
        <Tag width="2.2rem" color={props.tag?.color} />
        <div className="task__details">
          <span className="task__title">{props.title}</span>
          <span className="task__date">
            <TodayOutlinedIcon
              sx={{ width: "1.3rem", marginRight: "0.2rem" }}
            />{" "}
            {props.date?.toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* <div>
        {props.onEditClick && (
          <IconButton onClick={() => props.onEditClick?.(props.id)}>
            <EditIcon />
          </IconButton>
        )}
        {props.onDeleteClick && (
          <IconButton onClick={() => props.onDeleteClick?.(props.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </div> */}
    </div>
  );
};

export default React.memo(TaskRow);

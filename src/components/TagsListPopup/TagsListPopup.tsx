import { Dialog } from "@mui/material";
import React, { useEffect } from "react";
import { DEFAULT_TAG } from "../../utils/constants";
import Tag from "../Tag/Tag";

import "./TagsListPopup.css";

interface TagsListPopupProps {
  open: boolean;
  onClose: () => void;
  tags: ITag[];
  onTagClick?: (tag: ITag) => void;
}

const TagsListPopup: React.FC<TagsListPopupProps> = (props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      sx={{ "& .MuiPaper-root": { maxHeight: "40%" } }}
    >
      {props.tags.map((tag) => {
        return (
          <div
            key={tag.id}
            className="tag__row"
            onClick={() => props.onTagClick?.(tag)}
          >
            <Tag width="1.5rem" color={tag.color} />
            <span className="tag__title">{tag.name}</span>
          </div>
        );
      })}

      <div className="tag__row" onClick={() => props.onTagClick?.(DEFAULT_TAG)}>
        <Tag width="1.5rem" color={DEFAULT_TAG.color} />
        <span className="tag__title">{DEFAULT_TAG.name}</span>
      </div>
    </Dialog>
  );
};

export default TagsListPopup;

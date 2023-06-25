import { Dialog } from "@mui/material";
import React from "react";

import "./TagsListPopup.css";
import TagsList from "../TagsList/TagsList";

interface TagsListPopupProps {
  open: boolean;
  onClose: () => void;
  tags: ITag[];
  onTagClick: (tag: ITag) => void;
}

const TagsListPopup: React.FC<TagsListPopupProps> = (props) => {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      sx={{ "& .MuiPaper-root": { maxHeight: "40%", width: "70vw" } }}
    >
      <TagsList tags={props.tags} tagWidth="2rem" onTagClick={props.onTagClick} />
    </Dialog>
  );
};

export default TagsListPopup;

import { useState } from "react";
import Colorful from "@uiw/react-color-colorful";
import { Dialog, TextField } from "@mui/material";
import "./AddTagPopup.css";
import { TagService } from "../../services/tag.service";

interface IAddTagProps {
  open: boolean;
  onCancel: () => void;
}

const AddTagPopup = (props: IAddTagProps) => {
  const [tagColor, setTagColor] = useState("#8A64D6");
  const [tagName, setTagName] = useState("");

  const onSaveTag = () => {
    console.log(TagService.addTag({ name: tagName, color: tagColor } as ITag));
    props.onCancel();
  };
  return (
    <Dialog open={props.open} fullWidth>
      <div className="addTagPageContainer">
        <Colorful
          color={tagColor}
          onChange={(color) => {
            setTagColor(color.hex);
          }}
          disableAlpha={true}
        />
        <TextField
          label="Tag name"
          value={tagName}
          onChange={(text) => setTagName(text.target.value)}
          //   sx={styles.field}
          required={true}
          placeholder="Tag name"
        />
        <div className="addTagButtonsContainer">
          <button
            className="btn btn__primary add-event__btn"
            onClick={onSaveTag}
          >
            Save
          </button>
          <button
            className="btn btn__secondary add-event__btn"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTagPopup;

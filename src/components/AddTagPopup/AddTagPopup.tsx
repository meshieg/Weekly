import { useEffect, useState } from "react";
import Colorful from "@uiw/react-color-colorful";
import { Dialog, TextField } from "@mui/material";
import "./AddTagPopup.css";
import { TagService } from "../../services/tag.service";
import GeneralDialog from "../GeneralDialog/GeneralDialog";
import { ReactComponent as AddTaskIcon } from "../../assets/icons/AddTaskIcon.svg";

interface IAddTagProps {
  open: boolean;
  onCancel: () => void;
  tag?: ITag;
}

const AddTagPopup = (props: IAddTagProps) => {
  const [tagColor, setTagColor] = useState("#8A64D6");
  const [tagName, setTagName] = useState("");
  // const icon: JSX.Element = <successIcon />;

  useEffect(() => {
    if (props.tag) {
      setTagColor(props.tag.color);
      setTagName(props.tag.name);
    } else {
      setTagColor("#8A64D6");
      setTagName("");
    }
  }, [props.open]);

  const onSaveTag = () => {
    if (props.tag) {
      TagService.updateTag({
        id: props.tag.id,
        name: tagName,
        color: tagColor,
      } as ITag)
        .then((data) => {})
        .catch((err) => {
          //TODO: add error alert
        })
        .finally(() => {
          props.onCancel();
        });
    } else {
      TagService.addTag({ name: tagName, color: tagColor } as ITag)
        .then((data) => {})
        .catch((err) => {
          //TODO: add error alert
        })
        .finally(() => {
          props.onCancel();
        });
    }
  };
  return (
    <GeneralDialog
      open={props.open}
      onClose={props.onCancel}
      icon={<AddTaskIcon />}
    >
      {/* <Dialog open={props.open} fullWidth> */}
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
      {/* </Dialog> */}
    </GeneralDialog>
  );
};

export default AddTagPopup;

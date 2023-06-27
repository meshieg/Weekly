import { useEffect, useState } from "react";
import Colorful from "@uiw/react-color-colorful";
import { TextField } from "@mui/material";
import "./AddTagPopup.css";
import { TagService } from "../../services/tag.service";
import GeneralDialog from "../GeneralDialog/GeneralDialog";
import { ReactComponent as AddTaskIcon } from "../../assets/icons/AddTaskIcon.svg";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../AlertPopup/AlertPopup";

interface IAddTagProps {
  open: boolean;
  onCancel: () => void;
  tag?: ITag;
}

const AddTagPopup = (props: IAddTagProps) => {
  const [tagColor, setTagColor] = useState("#8A64D6");
  const [tagName, setTagName] = useState("");
  const { setAlert } = useAlert();

  useEffect(() => {
    if (props.tag) {
      setTagColor(props.tag.color);
      setTagName(props.tag.name);
    } else {
      setTagColor("#8A64D6");
      setTagName("");
    }
  }, [props.open]);

  const onSaveTag = (event: any) => {
    event.preventDefault();
    if (tagName !== undefined && tagName !== "" && tagName !== " ") {
      if (props.tag) {
        TagService.updateTag({
          id: props.tag.id,
          name: tagName,
          color: tagColor,
        } as ITag)
          .then((data) => {
            setAlert("success", "Tag updated successfully");
          })
          .catch((err) => {
            setAlert("error", "Could not update tag:( please try again later");
          })
          .finally(() => {
            props.onCancel();
          });
      } else {
        TagService.addTag({ name: tagName, color: tagColor } as ITag)
          .then((data) => {
            setAlert("success", "Tag added successfully");
          })
          .catch((err) => {
            setAlert("error", "Could not add tag:( please try again later");
          })
          .finally(() => {
            props.onCancel();
          });
      }
    }
  };

  return (
    <GeneralDialog
      open={props.open}
      onClose={props.onCancel}
      icon={<AddTaskIcon />}
    >
      <form onSubmit={onSaveTag} onReset={props.onCancel}>
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
            required={true}
            placeholder="Tag name"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
              "& label.Mui-focused": {
                color: "var(--primary-color)",
              },
            }}
          />
          {/* <AlertPopup /> */}
          <div className="addTagButtonsContainer">
            <button
              type="submit"
              className="btn btn__primary add-event__btn"
              // onClick={onSaveTag}
            >
              Save
            </button>
            <button
              type="reset"
              className="btn btn__secondary add-event__btn"
              // onClick={props.onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </GeneralDialog>
  );
};

export default AddTagPopup;

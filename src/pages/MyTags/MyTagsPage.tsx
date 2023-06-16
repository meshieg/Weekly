import { useEffect, useState } from "react";
import useToolbar from "../../customHooks/useToolbar";
import { TagService } from "../../services/tag.service";
import Tag from "../../components/Tag/Tag";
import AddTagPopup from "../../components/AddTagPopup/AddTagPopup";
import add_tag from "../../assets/images/add_tag.svg";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const MyTagsPage = () => {
  const { setToolbar } = useToolbar();
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const [openAddEditPopup, setOpenAddEditPopup] = useState<boolean>(false);
  const [tagToUpdate, setTagToUpdate] = useState<ITag | undefined>();

  useEffect(() => {
    setToolbar("My Tags", true);

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tagsList, openAddEditPopup]);

  const MyTagsList = tagsList.map((tag) => {
    return (
      <div
        key={tag.id}
        className="tag__row"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: "5%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Tag
            width="1.5rem"
            color={tag.color}
            onClick={() => {
              onTagClick(tag);
            }}
          />
          <span
            className="tag__title"
            onClick={() => {
              onTagClick(tag);
            }}
          >
            {tag.name}
          </span>
        </div>
        <IconButton
          onClick={() => {
            onTagDelete(tag.id);
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
    );
  });

  const onTagClick = (tag: ITag) => {
    setTagToUpdate(tag);
    setOpenAddEditPopup(true);
  };
  const onTagDelete = (tagId: number) => {
    TagService.deleteTag(tagId)
      .then((deleted) => {
        if (deleted) {
          setTagsList(tagsList.filter((tag) => tag.id === tagId));
        } else {
          //TODO: add alert error message
          console.log("failed to delete tag");
        }
      })
      .catch(() => {
        //TODO: add alert error message
        console.log("failed to delete tag");
      });
  };

  const onClosePopup = () => {
    setOpenAddEditPopup(false);
    setTagToUpdate(undefined);
  };

  return (
    <div
      style={{
        margin: "3%",
      }}
    >
      {" "}
      {MyTagsList}
      <div
        className="tag__row"
        onClick={() => {
          setTagToUpdate(undefined);
          setOpenAddEditPopup(true);
        }}
      >
        <img src={add_tag} width="30px" height="30px" />
        <span className="tag__title">Add tag</span>
      </div>
      <AddTagPopup
        open={openAddEditPopup}
        onCancel={onClosePopup}
        tag={tagToUpdate}
      />
    </div>
  );
};

export default MyTagsPage;

import { useEffect, useState } from "react";
import useToolbar from "../../customHooks/useToolbar";
import { TagService } from "../../services/tag.service";
import AddTagPopup from "../../components/AddTagPopup/AddTagPopup";
import add_tag from "../../assets/images/add_tag.svg";
import TagsList from "../../components/TagsList/TagsList";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import useAlert from "../../customHooks/useAlert";

const MyTagsPage = () => {
  const { setToolbar } = useToolbar();
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const [openAddEditPopup, setOpenAddEditPopup] = useState<boolean>(false);
  const [tagToUpdate, setTagToUpdate] = useState<ITag | undefined>();
  const { setAlert } = useAlert();

  useEffect(() => {
    setToolbar("My Tags", true);

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
      })
      .catch((err) => {
        setAlert("error", "Something went wrong:( please try again later");
        console.log(err);
      });
  }, [tagsList, openAddEditPopup]);

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
          setAlert("error", "This tag cannot be deleted");
        }
      })
      .catch((err) => {
        setAlert("error", "You cannot delete a used tag");
        console.log(err);
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
        width: "100%"
      }}
    >
      {" "}
      <TagsList
        tags={tagsList}
        tagWidth="2rem"
        displayEmptyTag={false}
        onTagClick={onTagClick}
        onTagDelete={onTagDelete}
      />
      <div
        className="tag__row"
        onClick={() => {
          setTagToUpdate(undefined);
          setOpenAddEditPopup(true);
        }}
      >
        <img src={add_tag} width="30px" height="30px" alt="empty tag" />
        <span className="tag__title">Add tag</span>
      </div>
      <AddTagPopup
        open={openAddEditPopup}
        onCancel={onClosePopup}
        tag={tagToUpdate}
      />
      <AlertPopup />
    </div>
  );
};

export default MyTagsPage;

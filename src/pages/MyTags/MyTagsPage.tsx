import { useEffect, useState } from "react";
import useToolbar from "../../customHooks/useToolbar";
import { TagService } from "../../services/tag.service";
import Tag from "../../components/Tag/Tag";
import AddTagPopup from "../../components/AddTagPopup/AddTagPopup";
import add_tag from "../../assets/images/add_tag.svg";

const MyTagsPage = () => {
  const { setToolbar } = useToolbar();
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const [openAddEditPopup, setOpenAddEditPopup] = useState<boolean>(false);

  useEffect(() => {
    setToolbar("My Tags", true);

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const MyTagsList = tagsList.map((tag) => {
    return (
      <div
        key={tag.id}
        className="tag__row"
        // onClick={() => props.onTagClick?.(tag)}
      >
        <Tag width="1.5rem" color={tag.color} />
        <span className="tag__title">{tag.name}</span>
      </div>
    );
  });

  //   const onTagClick = ()=>{}
  // const onTagDelete = ()=>{}
  const onClosePopup = () => {
    setOpenAddEditPopup(false);
  };

  return (
    <div>
      {" "}
      {MyTagsList}
      <div className="tag__row" onClick={() => setOpenAddEditPopup(true)}>
        <img src={add_tag} />
        <span className="tag__title">Add tag</span>
      </div>
      <AddTagPopup open={openAddEditPopup} onCancel={onClosePopup} />
    </div>
  );
};

export default MyTagsPage;

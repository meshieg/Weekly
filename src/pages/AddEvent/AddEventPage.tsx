import { useState, useEffect } from "react";
import "./AddEventPage.css";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, eventFields } from "./AddEventForm";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_TAG } from "../../utils/constants";
import moment from "moment";
import Tag from "../../components/Tag/Tag";
import { TagService } from "../../services/tag.service";
import TagsListPopup from "../../components/TagsListPopup/TagsListPopup";
import useToolbar from "../../customHooks/useToolbar";

const AddEventPage = () => {
  const location = useLocation();
  const eventToUpdate: IEvent = location.state?.event;
  const initialValues: IInputs = {
    title: eventToUpdate?.title ?? "",
    location: eventToUpdate?.location ?? "",
    startTime: eventToUpdate?.startTime ?? new Date(0, 0, 0, 0, 0, 0),
    endTime: eventToUpdate?.endTime ?? new Date(0, 0, 0, 0, 0, 0),
    startDate: eventToUpdate?.startTime ?? new Date(),
    endDate: eventToUpdate?.endTime ?? new Date(),
    description: eventToUpdate?.description ?? "",
  };
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);
  const [tag, setTag] = useState<ITag>(DEFAULT_TAG);
  const navigate = useNavigate();
  const { addItem } = useNewItemsContext();
  const [tagsPopupOpen, setTagsPopupOpen] = useState<boolean>(false);
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const { setToolbar } = useToolbar();

  useEffect(() => {
    setInputsValues(initialValues);
    setToolbar("Add Event", true);

    TagService.getAllTagsByUser()
      .then((tags: ITag[]) => {
        setTagsList(tags);
      })
      .catch((err) => {
        console.log(err);
      });
    if (eventToUpdate !== undefined) {
      eventToUpdate.tag && onSelectTag(eventToUpdate.tag);
    }
  }, []);

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof IInputs;
    setInputsValues((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const saveEvent = (event: any) => {
    event.preventDefault();

    const startDateTime: string =
      moment(inputValues.startDate).format("YYYY-MM-DD") +
      " " +
      moment(inputValues.startTime).format("HH:mm:ss");

    const endDateTime: string =
      moment(inputValues.endDate).format("YYYY-MM-DD") +
      " " +
      moment(inputValues.endTime).format("HH:mm:ss");

    const newEvent: IEvent = {
      id: eventToUpdate ? eventToUpdate.id : 0,
      title: inputValues.title,
      location: inputValues.location,
      startTime: new Date(startDateTime),
      endTime: new Date(endDateTime),
      tag: tag.id !== 0 ? tag : undefined,
      description: inputValues.description,
    };
    if (eventToUpdate === undefined) {
      console.log(newEvent);

      addItem(newEvent);
      setInputsValues(initialValues);
      navigate("/new-tasks");
    } else {
      // TODO add request to server
      navigate("./");
    }
  };

  const cancelEvent = (event: any) => {
    event.preventDefault();
    setInputsValues(initialValues);
    navigate(-1);
  };

  const onTagClick = () => {
    setTagsPopupOpen(true);
  };

  const onSelectTag = (tag: ITag) => {
    setTag(tag);
    setTagsPopupOpen(false);
  };

  return (
    <div className="pageContainer">
      <form onSubmit={saveEvent} onReset={cancelEvent}>
        <div className="add_event__form">
          {Object.keys(eventFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={eventFields[fieldKey]?.label || ""}
                type={eventFields[fieldKey]?.type}
                options={eventFields[fieldKey]?.options}
                value={inputValues[fieldKey]}
                onChange={setValues}
                required={eventFields[fieldKey]?.required}
                multiline={eventFields[fieldKey]?.multiline}
              />
            );
          })}

          <Tag
            width="2.8rem"
            label={tag.name}
            color={tag.color}
            onClick={onTagClick}
          />
        </div>

        <TagsListPopup
          open={tagsPopupOpen}
          onClose={() => setTagsPopupOpen(false)}
          tags={tagsList}
          onTagClick={onSelectTag}
        />

        <div className="add_event_buttons">
          <button className="btn btn__primary" type="submit">
            Save
          </button>
          <button className="btn btn__secondary" type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddEventPage;

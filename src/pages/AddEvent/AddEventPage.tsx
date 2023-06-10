import { useState, useEffect } from "react";
import "./AddEventPage.css";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, eventFields } from "./AddEventForm";
import { useNewItemsContext } from "../../contexts/NewItemsStore/NewItemsContext";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_TAG, EditScreensState } from "../../utils/constants";
import moment from "moment";
import Tag from "../../components/Tag/Tag";
import { TagService } from "../../services/tag.service";
import TagsListPopup from "../../components/TagsListPopup/TagsListPopup";
import useToolbar from "../../customHooks/useToolbar";
import { EventService } from "../../services/event.service";
import { validateEventInputs } from "../../helpers/functions";
import useAlert from "../../customHooks/useAlert";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import AlgoMessagePopup from "../../components/AlgoMessagePopup/AlgoMessagePopup";
import { ScheduleService } from "../../services/schedule.service";

const fieldsToDisplayAlgoPopup = ["startTime", "endTime"];

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
  const [tag, setTag] = useState<ITag>(eventToUpdate?.tag || DEFAULT_TAG);
  const navigate = useNavigate();
  const { addItem, updateItem } = useNewItemsContext();
  const [tagsPopupOpen, setTagsPopupOpen] = useState<boolean>(false);
  const [tagsList, setTagsList] = useState<ITag[]>([]);
  const { setToolbar } = useToolbar();
  const { setAlert } = useAlert();
  const [algoPopupOpen, setAlgoPopupOpen] = useState(false);
  const [newEventState, setNewEventState] = useState<IEvent>();

  const getScreenState = () => {
    if (eventToUpdate === undefined) {
      return EditScreensState.ADD;
    }
    if (location.state?.isFromDB) {
      return EditScreensState.EDIT;
    }
    return EditScreensState.EDIT_LOCAL;
  };

  const screenState = getScreenState();

  useEffect(() => {
    setInputsValues(initialValues);
    setToolbar(
      location.state?.event === undefined ? "Add Event" : "Edit Event",
      true
    );

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
      moment(inputValues.startTime).format("HH:00:00");

    const endDateTime: string =
      moment(inputValues.endDate).format("YYYY-MM-DD") +
      " " +
      moment(inputValues.endTime).format("HH:00:00");

    const newEvent: IEvent = {
      id: eventToUpdate ? eventToUpdate.id : 0,
      title: inputValues.title,
      location: inputValues.location,
      startTime: new Date(startDateTime),
      endTime: new Date(endDateTime),
      tag: tag.id !== 0 ? tag : undefined,
      description: inputValues.description,
    };

    setNewEventState(newEvent);

    // Validate inputs
    const alertMessage = validateEventInputs(newEvent);
    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    // Save event
    switch (screenState) {
      // add new event
      case EditScreensState.ADD:
        addItem(newEvent);
        setInputsValues(initialValues);
        navigate("/new-tasks");
        break;

      // update event on DB
      case EditScreensState.EDIT:
        if (displayAlgoPopup(newEvent)) {
          setAlgoPopupOpen(true);
        } else {
          updateEventOnDB(newEvent);
        }
        break;

      // update local event
      case EditScreensState.EDIT_LOCAL:
        updateItem(newEvent);
        navigate(-1);
        break;
    }
  };

  const displayAlgoPopup = (newEvent: IEvent) => {
    let changedFieldKey;
    if (newEvent) {
      changedFieldKey = fieldsToDisplayAlgoPopup.find(
        (fieldKey: string) =>
          newEvent[fieldKey as keyof IEvent]?.toString() !==
          eventToUpdate[fieldKey as keyof IEvent]?.toString()
      );
    }

    return changedFieldKey !== undefined;
  };

  const updateEventOnDB = async (newEvent: IEvent) => {
    if (newEvent) {
      return await EventService.updateEvent(newEvent)
        .then((updatedEvent) => {
          console.log(updatedEvent);
          if (updatedEvent) {
            navigate(-1);
          } else {
            setAlert("error", "failed to save event");
          }
        })
        .catch(() => {
          setAlert("error", "failed to save event");
        });
    }
  };

  const generateSchedule = () => {
    if (newEventState) {
      ScheduleService.generateSchedule([], [newEventState])
        .then(() => {
          console.log("Items saved successfully");
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
          //TODO: add error message to user
        });
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
    <div className="add-event__pageContainer">
      <form
        onSubmit={saveEvent}
        onReset={cancelEvent}
        className="add-event__form"
      >
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

        <TagsListPopup
          open={tagsPopupOpen}
          onClose={() => setTagsPopupOpen(false)}
          tags={tagsList}
          onTagClick={onSelectTag}
        />

        <AlertPopup />
        <div className="add-event_buttons">
          <button className="btn btn__primary add-event__btn" type="submit">
            Save
          </button>
          <button className="btn btn__secondary add-event__btn" type="reset">
            Cancel
          </button>
        </div>
      </form>

      <AlgoMessagePopup
        open={algoPopupOpen}
        onClose={() => setAlgoPopupOpen(false)}
        primaryAction={generateSchedule}
        secondaryAction={() => newEventState && updateEventOnDB(newEventState)}
      />
    </div>
  );
};
export default AddEventPage;

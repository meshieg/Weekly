import { ITaskEntity } from "../../utils/types";
import { fieldsTypes } from "../../utils/constants";

type inputFields = {
  [id in keyof ITaskEntity]: IField;
};

export const taskFields: inputFields = {
  title: {
    label: "Title",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "כותרת משימה"
  },
  location: {
    label: "Location",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "מיקום"
  },
  destDate: {
    label: "Destination Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "תאריך יעד"
  },
  time: {
    label: "Time",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "זמן משוער"
  },
  desc: {
    label: "Description",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "תיאור"
  },
  priority: {
    label: "Priority",
    type: fieldsTypes.Autocomplete,
    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" }     // TODO: Change to number field 1-10
    ],
    required: true,
    placeholder: "עדיפות"
  }
};
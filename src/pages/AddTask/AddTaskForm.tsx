import { ITaskEntity } from "../../utils/types";
import { fieldsTypes, Priority, PriorityLabels } from "../../utils/constants";

type inputFields = {
  [id in keyof ITaskEntity]: IField;
};

export const taskFields: inputFields = {
  title: {
    label: "Title",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "כותרת משימה",
  },
  location: {
    label: "Location",
    type: fieldsTypes.TextField,
    required: false,
    placeholder: "מיקום",
  },
  dueDate: {
    label: "Due Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "תאריך יעד",
  },
  estTime: {
    label: "Estimated Time",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "זמן משוער",
  },
  description: {
    label: "Description",
    type: fieldsTypes.TextField,
    required: false,
    placeholder: "תיאור",
  },
  priority: {
    label: "Priority",
    type: fieldsTypes.Autocomplete,
    options: [
      { id: Priority.HIGH, label: PriorityLabels[Priority.HIGH] },
      { id: Priority.MEDIUM, label: PriorityLabels[Priority.MEDIUM] },
      { id: Priority.LOW, label: PriorityLabels[Priority.LOW] }, // TODO: Change to number field 1-10
    ],
    required: false,
    placeholder: "עדיפות",
  },
};

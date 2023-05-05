// import { ITaskEntity } from "../../utils/types";
import { fieldsTypes, Priority, PriorityLabels } from "../../utils/constants";

export interface IInputs {
  title: string;
  location: string;
  estTime: number;
  dueDate: Date;
  description: string;
  priority: number;
  // tag: ITag;
}

type inputFields = {
  [id in keyof IInputs]: IField;
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
    required: true,
    placeholder: "מיקום",
  },
  estTime: {
    label: "Estimated Time",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "זמן משוער",
  },
  dueDate: {
    label: "Due Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "תאריך יעד",
  },
  description: {
    label: "Description",
    type: fieldsTypes.TextField,
    required: true,
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
    required: true,
    placeholder: "עדיפות",
  },
};

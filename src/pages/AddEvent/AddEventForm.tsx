// import { ITaskEntity } from "../../utils/types";
import { fieldsTypes, Priority, PriorityLabels } from "../../utils/constants";

export interface IInputs {
  title: string;
  location: string;
  startTime: number;
  endTime: number;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  description: string;
}

type inputFields = {
  [id in keyof IInputs]: IField;
};

export const eventFields: inputFields = {
  title: {
    label: "Title",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Title",
  },
  location: {
    label: "Location",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Location",
  },
  startTime: {
    label: "Start time",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Start time",
  },
  endTime: {
    label: "End Time",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "End time",
  },
  startDate: {
    label: "Start Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "Start date",
  },
  endDate: {
    label: "End Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "End date",
  },
  description: {
    label: "Description",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Description",
  },
  allDay: {
    label: "All day",
    type: fieldsTypes.Checkbox,
    required: true,
  },
};

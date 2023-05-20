import { fieldsTypes } from "../../utils/constants";

export interface IInputs {
  title: string;
  location: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
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
    placeholder: "Location",
  },
  description: {
    label: "Description",
    type: fieldsTypes.TextField,
    placeholder: "Description",
    multiline: true,
  },
  startDate: {
    label: "Start Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "Start date",
    width: "50%",
  },
  startTime: {
    label: "Start time",
    type: fieldsTypes.TimePicker,
    required: true,
    placeholder: "Start time",
    width: "50%",
  },
  endDate: {
    label: "End Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "End date",
    width: "50%",
  },
  endTime: {
    label: "End Time",
    type: fieldsTypes.TimePicker,
    required: true,
    placeholder: "End time",
    width: "50%",
  },
};

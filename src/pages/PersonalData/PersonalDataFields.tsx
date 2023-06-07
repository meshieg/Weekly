import { fieldsTypes } from "../../utils/constants";

export interface IInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  beginDayHour: Date;
  endDayHour: Date;
}

type inputFields = {
  [id in keyof IInputs]: IField;
};

export const personalDataFields: inputFields = {
  firstName: {
    label: "First name",
    type: fieldsTypes.TextField,
    required: true,
  },
  lastName: {
    label: "Last name",
    type: fieldsTypes.TextField,
    required: true,
  },
  email: {
    label: "Email",
    type: fieldsTypes.TextField,
    required: true,
  },
  password: {
    label: "Password",
    type: fieldsTypes.Password,
    required: true,
  },
  beginDayHour: {
    label: "I start my day at...",
    type: fieldsTypes.TimePicker,
    required: true,
  },
  endDayHour: {
    label: "I end my day at...",
    type: fieldsTypes.TimePicker,
    required: true,
  },
};

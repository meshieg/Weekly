import { fieldsTypes } from "../../utils/constants";

export interface IInputs {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  beginDayHour: Date;
  endDayHour: Date;
}

export type inputFields = {
  [id in keyof IInputs]: IField;
};

export const registerFields: inputFields = {
  firstName: {
    label: "First name",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "First name",
  },
  lastName: {
    label: "Last name",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Last name",
  },
  email: {
    label: "Email",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Email",
  },
  password: {
    label: "Password",
    type: fieldsTypes.Password,
    required: true,
    placeholder: "Password",
  },
  confirmPassword: {
    label: "Confirm password",
    type: fieldsTypes.Password,
    required: true,
    placeholder: "Confirm password",
  },
  beginDayHour: {
    label: "I start my day at...",
    type: fieldsTypes.TimePicker,
    required: true,
    placeholder: "I start my day at...",
  },
  endDayHour: {
    label: "I end my day at...",
    type: fieldsTypes.TimePicker,
    required: true,
    placeholder: "I end my day at...",
  },
};

import { fieldsTypes } from "../../utils/constants";
import { IInputs, inputFields } from "./RegisterFields";

// type inputFields = {
//   [id in keyof IInputs]: IField;
// };

export const personalDataFields: inputFields = {
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

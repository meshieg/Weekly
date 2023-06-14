import { fieldsTypes } from "../../utils/constants";
import { inputFields } from "./RegisterFields";

export const personalDataFields: inputFields = {
  firstName: {
    label: "First name",
    type: fieldsTypes.TextField,
    required: true,
    disabled: false
  },
  lastName: {
    label: "Last name",
    type: fieldsTypes.TextField,
    required: true,
    disabled: false
  },
  email: {
    label: "Email",
    type: fieldsTypes.TextField,
    required: true,
    disabled: true
  },
  beginDayHour: {
    label: "I start my day at...",
    type: fieldsTypes.TimePicker,
    required: true,
    disabled: false
  },
  endDayHour: {
    label: "I end my day at...",
    type: fieldsTypes.TimePicker,
    required: true,
    disabled: false
  },
};

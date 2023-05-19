// import { ITaskEntity } from "../../utils/types";
import { fieldsTypes, Priority, PriorityLabels } from "../../utils/constants";

// export interface IInputs {
//   title: string;
//   location: string;
//   startTime: number;
//   endTime: number;
//   startDate: Date;
//   endDate: Date;
//   description: string;
// }
export interface IInputs {
  title: string;
  location?: string;
  description?: string;
  startTime: Date;
  endTime: Date;
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
  description: {
    label: "Description",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Description",
  },
  startTime: {
    label: "Start time",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "Start time",
  },
  endTime: {
    label: "End Time",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "End time",
  },
  // startTime: {
  //   label: "Start time",
  //   type: fieldsTypes.TextField,
  //   required: true,
  //   placeholder: "Start time",
  // },
  // endTime: {
  //   label: "End Time",
  //   type: fieldsTypes.TextField,
  //   required: true,
  //   placeholder: "End time",
  // },
  // startDate: {
  //   label: "Start Date",
  //   type: fieldsTypes.DatePicker,
  //   required: true,
  //   placeholder: "Start date",
  // },
  // endDate: {
  //   label: "End Date",
  //   type: fieldsTypes.DatePicker,
  //   required: true,
  //   placeholder: "End date",
  // },
};

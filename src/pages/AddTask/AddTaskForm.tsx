// import { ITaskEntity } from "../../utils/types";
import { fieldsTypes, Priority, PriorityLabels } from "../../utils/constants";

export interface IInputs {
  title: string;
  location: string;
  estTime: number;
  dueDate: Date;
  dueTime: Date;
  description: string;
  priority: number;
  assignmentDate?: Date;
  assignmentTime?: Date;
}

type inputFields = {
  [id in keyof IInputs]: IField;
};

export const taskFields: inputFields = {
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
  estTime: {
    label: "Estimated Time in Hours",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Estimated Time in Hours",
  },
  dueDate: {
    label: "Due Date",
    type: fieldsTypes.DatePicker,
    required: true,
    placeholder: "Due Date",
  },
  dueTime: {
    label: "Due Time",
    type: fieldsTypes.TimePicker,
    required: true,
    placeholder: "Due Time",
  },
  description: {
    label: "Description",
    type: fieldsTypes.TextField,
    placeholder: "Description",
    multiline: true,
  },
  priority: {
    label: "Priority",
    type: fieldsTypes.Autocomplete,
    options: [
      { id: Priority.HIGH, label: PriorityLabels[Priority.HIGH] },
      { id: Priority.MEDIUM, label: PriorityLabels[Priority.MEDIUM] },
      { id: Priority.LOW, label: PriorityLabels[Priority.LOW] },
    ],
    required: true,
    placeholder: "Priority",
  },
  assignmentDate: {
    label: "Assignment Date",
    type: fieldsTypes.DatePicker,
    placeholder: "Assignment Date",
  },
  assignmentTime: {
    label: "Assignment Time",
    type: fieldsTypes.TimePicker,
    placeholder: "Assignment Time",
  },
};

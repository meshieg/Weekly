import { fieldsTypes } from "../../utils/constants";

export interface IInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type inputFields = {
  [id in keyof IInputs]: IField;
};

export const registerFields: inputFields = {
  firstname: {
    label: "First name",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "First name",
  },
  lastname: {
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
};

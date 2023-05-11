import { fieldsTypes } from "../../utils/constants";

export interface IInputs {
  email: string;
  password: string;
}

type inputFields = {
  [id in keyof IInputs]: IField;
};

export const logInFields: inputFields = {
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
};

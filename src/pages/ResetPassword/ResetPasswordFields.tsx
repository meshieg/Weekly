import { fieldsTypes } from "../../utils/constants";

export interface IInputs {
  email: string;
  resetToken: string;
  password?: string;
  confirmPassword?: string;
}

type inputFields = {
  [id in keyof IInputs]: IField;
};

export const resetPasswordFields: inputFields = {
  email: {
    label: "Email",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Email",
  },
  resetToken: {
    label: "Reset token",
    type: fieldsTypes.TextField,
    required: true,
    placeholder: "Reset token",
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

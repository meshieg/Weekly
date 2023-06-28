import { useState, useContext } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import "./ResetPassword.css";
import {
  IInputs,
  resetPasswordFields,
} from "../ResetPassword/ResetPasswordFields";
import { useNavigate } from "react-router";
import { UserService } from "../../services/user.service";
import useToken from "../../customHooks/useToken";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import { IUser } from "../../utils/types";
import { validateUserInputs } from "../../helpers/functions";
import useAlert from "../../customHooks/useAlert";
import useUser from "../../customHooks/useUser";
import CustomLink from "../../components/CustomLink/CustomLink";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const [emailStatus, setEmailStatus] = useState(0);
  const [user, setUser] = useState<IUser>();

  const initialValues: IInputs = {
    email: "",
    resetToken: "",
    password: "",
    confirmPassword: "",
  };
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);

  const isResetMode = emailStatus === 200;
  const subtitleText = isResetMode
    ? "Enter the verification token you've got and your new password!"
    : "Forgot your password? No worries!";
  const buttonText = isResetMode ? "Reset my password" : "Send a reset email";

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof IInputs;
    setInputsValues((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const handleSendEmail = async (event: any) => {
    event.preventDefault();

    const user: IUser = {
      email: inputValues.email.toLowerCase(),
    };

    const alertMessage = validateUserInputs(user);

    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    await UserService.sendEmail(inputValues.email.toLowerCase())
      .then((data) => {
        setUser(data);
        setEmailStatus(200);
      })
      .catch((err) => {
        if (err?.response?.data?.errors[0]?.message) {
          setAlert("error", err?.response.data.errors[0].message);
        }
      });
  };

  const handleReset = async (event: any) => {
    event.preventDefault();

    const resetData: IUser = {
      resetToken: inputValues.resetToken,
      password: inputValues.password,
    };

    const alertMessage = validateUserInputs({
      ...resetData,
      confirmPassword: inputValues.confirmPassword,
    });

    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    if (user?.id && inputValues.resetToken) {
      await UserService.validateToken(user?.id, inputValues.resetToken)
        .then(() => {
          if (user.id && inputValues.password) {
            UserService.updatePassword(user?.id, inputValues.password)
              .then(() => {
                navigate("/login");
              })
              .catch((err) => {
                if (err?.response?.data?.errors[0]?.message) {
                  setAlert("error", err?.response.data.errors[0].message);
                }
              });
          }
        })
        .catch((err) => {
          if (err?.response?.data?.errors[0]?.message) {
            setAlert("error", err?.response.data.errors[0].message);
            return;
          }
        });
    }
  };

  return (
    <div className="reset_pageContainer">
      <div className="reset_image">
        <img
          src={require("../../assets/images/logo_no_background.png")}
          alt="logo"
        />
      </div>
      <form
        className="reset_form"
        onSubmit={isResetMode ? handleReset : handleSendEmail}
      >
        <div className="reset_text">{subtitleText} </div>
        <div className="reset_form_fields">
          {Object.keys(resetPasswordFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            if (
              (emailStatus !== 200 && fieldKey === "email") ||
              (emailStatus === 200 && fieldKey !== "email")
            ) {
              return (
                <SuperInputField
                  key={fieldKey}
                  id={fieldKey}
                  label={resetPasswordFields[fieldKey]?.label || ""}
                  type={resetPasswordFields[fieldKey]?.type}
                  options={resetPasswordFields[fieldKey]?.options}
                  value={inputValues[fieldKey]}
                  onChange={setValues}
                  required={true}
                />
              );
            }
          })}
        </div>
        <button className="btn btn__primary reset_form_btn" type="submit">
          {buttonText}
        </button>
      </form>
      <div className="login__link">
        <CustomLink text="Back to Login" onPress={() => navigate("/login")} />
      </div>
      <AlertPopup />
    </div>
  );
};

export default ResetPassword;

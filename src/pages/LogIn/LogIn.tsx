import { useState, useContext } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import "./LogIn.css";
import { IInputs, logInFields } from "../LogIn/LogInFields";
import CustomLink from "../../components/CustomLink/CustomLink";
import { useNavigate } from "react-router";
import { UserService } from "../../services/user.service";
import useToken from "../../customHooks/useToken";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import { IUser } from "../../utils/types";
import { validateUserInputs } from "../../helpers/functions";
import useAlert from "../../customHooks/useAlert";
import useUser from "../../customHooks/useUser";

const LogIn = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const { setAlert } = useAlert();
  const { setUser } = useUser();

  const initialValues: IInputs = {
    email: "",
    password: "",
  };
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof IInputs;
    setInputsValues((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const handleLogIn = async (event: any) => {
    event.preventDefault();

    const newUser: IUser = {
      email: inputValues.email,
      password: inputValues.password,
    };

    const alertMessage = validateUserInputs(newUser);

    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    await UserService.logIn(inputValues.email, inputValues.password)
      .then((data) => {
        setToken(data?.token);
        setUser(data?.user);
        navigate("/");
      })
      .catch((err) => {
        if (err?.response?.data?.errors[0]?.message) {
          setAlert("error", err?.response.data.errors[0].message);
        }
      });
  };

  return (
    <div className="login_pageContainer">
      <div className="login_image">
        <img
          src={require("../../assets/images/logo_no_background.png")}
          alt="logo"
        />
      </div>
      <form className="login_form" onSubmit={handleLogIn}>
        <div className="login_form_fields">
          {Object.keys(logInFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={logInFields[fieldKey]?.label || ""}
                type={logInFields[fieldKey]?.type}
                options={logInFields[fieldKey]?.options}
                value={inputValues[fieldKey]}
                onChange={setValues}
                required={true}
              />
            );
          })}
          <CustomLink
            text="Forgot your password?"
            onPress={() => navigate("/resetPassword")}
          />
        </div>
        <div className="login_form_buttons">
          <button className="btn btn__primary login_form_btn" type="submit">
            Log in
          </button>
          <div className="text">
            Not signed in yet?&nbsp;
            <CustomLink
              text="Click here!"
              onPress={() => navigate("/register")}
            />
          </div>
        </div>
        <AlertPopup />
      </form>
    </div>
  );
};

export default LogIn;

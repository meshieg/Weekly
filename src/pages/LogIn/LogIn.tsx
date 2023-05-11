import { useState } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import "./LogIn.css";
import { IInputs, logInFields } from "../LogIn/LogInFields";
import CustomLink from "../../components/CustomLink/CustomLink";

const LogIn = () => {
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

  return (
    <div className="pageContainer">
      <div className="image">
        <img src={require("../../assets/images/logo_no_background.png")} />
      </div>
      <form onSubmit={() => {}} onReset={() => {}}>
        <div className="form">
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
          <CustomLink text="Forgot your password?" onPress={() => {}} />
        </div>
        <div className="login_form_btn">
          <div>
            <button className="btn btn__primary" type="submit">
              Log in
            </button>
          </div>
          <div className="text">
            Not signed in yet?&nbsp;
            <CustomLink text="Click here!" onPress={() => {}} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;

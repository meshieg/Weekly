import { useState } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import "./Register.css";
import { IInputs, registerFields } from "../Register/RegisterFields";

const Register = () => {
  const initialValues: IInputs = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
          {Object.keys(registerFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={registerFields[fieldKey]?.label || ""}
                type={registerFields[fieldKey]?.type}
                options={registerFields[fieldKey]?.options}
                value={inputValues[fieldKey]}
                onChange={setValues}
                required={true}
              />
            );
          })}
        </div>
        <div className="reg_form_btn">
          <button className="btn btn__primary" type="submit">
            Let's start planning!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

import { useState } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import "./Register.css";
import { IInputs, registerFields } from "../Register/RegisterFields";
import { useNavigate } from "react-router";
import { UserService } from "../../services/user.service";
import { IUser } from "../../utils/types";
import useToken from "../../customHooks/useToken";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import useAlert from "../../customHooks/useAlert";
import { validateUserInputs } from "../../heplers/functions";

const Register = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const { setAlert } = useAlert();

  const initialValues: IInputs = {
    firstName: "",
    lastName: "",
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

  const handleRegister = async (event: any) => {
    event.preventDefault();
    const newUser: IUser = {
      firstName: inputValues.firstName,
      lastName: inputValues.lastName,
      email: inputValues.email,
      password: inputValues.password,
    };

    const alertMessage = validateUserInputs({
      ...newUser,
      confirmPassword: inputValues.confirmPassword,
    });

    if (alertMessage) {
      setAlert("error", alertMessage);
      return;
    }

    await UserService.register(newUser)
      .then((data) => {
        setToken(data?.token);

        const currUser = {
          id: data.user.id,
          firstName: newUser.firstName,
          lasrName: newUser.lastName,
          email: newUser.email,
        };

        sessionStorage.setItem("user", JSON.stringify(currUser));
        navigate("/week");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pageContainer">
      <div className="image">
        <img src={require("../../assets/images/logo_no_background.png")} />
      </div>
      <form onSubmit={handleRegister}>
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
            Lets start planning!
          </button>
        </div>
        <AlertPopup />
      </form>
    </div>
  );
};

export default Register;

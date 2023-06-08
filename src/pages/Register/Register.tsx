import { useState, useContext } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import "./Register.css";
import { IInputs, registerFields } from "../Register/RegisterFields";
import { useNavigate } from "react-router";
import { UserService } from "../../services/user.service";
import { IUser } from "../../utils/types";
import useToken from "../../customHooks/useToken";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import useAlert from "../../customHooks/useAlert";
import { validateUserInputs } from "../../helpers/functions";
import moment from "moment";
import useUser from "../../customHooks/useUser";

const Register = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const { setAlert } = useAlert();
  const { setUser } = useUser();

  const initialValues: IInputs = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    beginDayHour: new Date(0, 0, 0, 0, 0, 0),
    endDayHour: new Date(0, 0, 0, 0, 0, 0),
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
      beginDayHour: parseInt(moment(inputValues.beginDayHour).format("HH")),
      endDayHour: parseInt(moment(inputValues.endDayHour).format("HH")),
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
          beginDayHour: newUser.beginDayHour,
          endDayHour: newUser.endDayHour,
        };

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
    <div className="reg_pageContainer">
      <div className="reg_image">
        <img
          src={require("../../assets/images/logo_no_background.png")}
          alt="logo"
        />
      </div>
      <form className="reg_form" onSubmit={handleRegister}>
        <div className="reg_form_fields">
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
        <button className="btn btn__primary reg_form_btn" type="submit">
          Lets start planning!
        </button>
        <AlertPopup />
      </form>
    </div>
  );
};

export default Register;

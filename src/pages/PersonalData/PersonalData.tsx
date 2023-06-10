import "./PersonalData.css";
import { useState, useEffect } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { personalDataFields } from "./PersonalDataFields";
import { IInputs, inputFields, registerFields } from "./RegisterFields";
import { useNavigate } from "react-router";
import { UserService } from "../../services/user.service";
import { IUser } from "../../utils/types";
import useToken from "../../customHooks/useToken";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import useAlert from "../../customHooks/useAlert";
import { validateUserInputs } from "../../helpers/functions";
import moment from "moment";
import useUser from "../../customHooks/useUser";
import userImg from "../../assets/images/user_logo.svg";
import weeklyLogo from "../../assets/images/weekly_logo.svg";
import useToolbar from "../../customHooks/useToolbar";
import { ModeEditOutlineOutlined as EditIcon } from '@mui/icons-material';

const PersonalData = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const { setAlert } = useAlert();
  const { setToolbar } = useToolbar();
  const { setUser, user } = useUser();
  const [ currInputFields, setInputFields ] = useState<inputFields>(registerFields);

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

  useEffect(() => {
    if(user !== undefined) {
      console.log(user.beginDayHour.type);
      setInputsValues(user);
      setToolbar("Personal Data", true);
      setInputFields(personalDataFields);
    }
  }, [user]);

  const setValues = (objKey: string, newValue: any) => {
    const key = objKey as keyof IInputs;
    setInputsValues((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if(user) {
      console.log("test");
    } else {
      handleRegister();
    }
  }

  const handleRegister = async () => {
    // event.preventDefault();

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
        <img src={user ? userImg : weeklyLogo} alt="logo" />
      </div>
      <form className="reg_form" onSubmit={onSubmit}>
        <div className="reg_form_fields">
          {Object.keys(currInputFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={currInputFields[fieldKey]?.label || ""}
                type={currInputFields[fieldKey]?.type}
                options={currInputFields[fieldKey]?.options}
                value={inputValues[fieldKey]}
                onChange={setValues}
                required={true}
              />
            );
          })}
        </div>
        {user ?
          <button className="btn btn__primary reg_form_btn" type="submit">
            <EditIcon />
            Edit
            </button>
          :
          <button className="btn btn__primary reg_form_btn" type="submit">
            Lets start planning!
          </button>
        }
        <AlertPopup />
      </form>
    </div>
  );
};

export default PersonalData;

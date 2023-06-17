import "./PersonalData.css";
import { useState, useEffect } from "react";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { personalDataFields } from "./PersonalDataFields";
import { IInputs, registerFields } from "./RegisterFields";
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
import { ModeEditOutlineOutlined as EditIcon } from "@mui/icons-material";
import AlgoMessagePopup from "../../components/AlgoMessagePopup/AlgoMessagePopup";
import { ScheduleService } from "../../services/schedule.service";
import { EditScreensState } from "../../utils/constants";
import { useAppContext } from "../../contexts/AppContext";
import { USER_MESSAGES, serverError } from "../../utils/messages";

// const fieldsToDisplayAlgoPopup = [
//   "beginDayHour",
//   "endDayHour"
// ];

const initialValues: IInputs = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  beginDayHour: new Date(0, 0, 0, 9, 0, 0),
  endDayHour: new Date(0, 0, 0, 0, 17, 0),
};

const PersonalData = () => {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const { setAlert } = useAlert();
  const { setToolbar } = useToolbar();
  const { setUser, user } = useUser();
  const currInputFields = user ? personalDataFields : registerFields;
  const [inputValues, setInputsValues] = useState<IInputs>(initialValues);
  const [displaySchedulePopup, setDisplayPopup] = useState<boolean>(false);
  const [screenState, setScreenState] = useState<number>(EditScreensState.ADD);
  const { setPopupMessage } = useAppContext();

  useEffect(() => {
    if (user) {
      setScreenState(EditScreensState.EDIT_LOCAL);
      setInputsValues({
        ...user,
        beginDayHour: new Date(0, 0, 0, user.beginDayHour),
        endDayHour: new Date(0, 0, 0, user.endDayHour),
      });

      setToolbar("Personal Data", true);
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

    switch (screenState) {
      // Register
      case EditScreensState.ADD:
        handleRegister();
        break;

      // Save the updated user
      case EditScreensState.EDIT:
        handleUpdateUser();
        break;

      // Change to 'edit mode'
      case EditScreensState.EDIT_LOCAL:
        setScreenState(EditScreensState.EDIT);
        break;
    }
  };

  const onCancel = (event: any) => {
    event.preventDefault();
    setScreenState(EditScreensState.EDIT_LOCAL);
    setInputsValues({
      ...user,
      beginDayHour: new Date(0, 0, 0, user.beginDayHour),
      endDayHour: new Date(0, 0, 0, user.endDayHour),
    });
  };

  const handleRegister = async () => {
    let newUser: IUser = {
      firstName: inputValues.firstName,
      lastName: inputValues.lastName,
      email: inputValues.email,
      password: inputValues.password,
      beginDayHour: parseInt(moment(inputValues.beginDayHour).format("HH")),
      endDayHour: parseInt(moment(inputValues.endDayHour).format("HH")),
    };

    // When the user basically works 24/7
    if (newUser.beginDayHour === newUser.endDayHour) {
      newUser = { ...newUser, beginDayHour: 0, endDayHour: 0 };
    }

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

        setUser(data?.user);
        navigate("/");
      })
      .catch((err) => {
        if (err?.response?.data?.errors[0]?.message) {
          setAlert("error", err?.response.data.errors[0].message);
        }
      });
  };

  const handleUpdateUser = async () => {
    const updatedUser = {
      id: user.id,
      firstName: inputValues.firstName,
      lastName: inputValues.lastName,
      email: inputValues.email,
      beginDayHour: parseInt(moment(inputValues.beginDayHour).format("HH")),
      endDayHour: parseInt(moment(inputValues.endDayHour).format("HH")),
    };

    if (checkChangedFields(updatedUser)) {
      await UserService.updateUser(updatedUser)
        .then((data) => {
          setUser(updatedUser);
          if (displaySchedulePopup) {
            generateSchedule();
          }
          setAlert("success", "Changes were saved successfully!");
        })
        .catch((error) => {
          if (error?.response?.data?.errors[0]?.message) {
            setAlert("error", error?.response.data.errors[0].message);
          }
        });
    } else {
      setScreenState(EditScreensState.EDIT_LOCAL);
    }
  };

  const checkChangedFields = (updatedUser: IUser) => {
    const timeChanged =
      user.beginDayHour !== updatedUser.beginDayHour ||
      user.endDayHour !== updatedUser.endDayHour;
    const nameChanged =
      user.firstName !== updatedUser.firstName ||
      user.lastName !== updatedUser.lastName;

    setDisplayPopup(timeChanged);
    return nameChanged || timeChanged;
  };

  const generateSchedule = async () => {
    await ScheduleService.generateSchedule([])
      .then((res) => {
        setPopupMessage(USER_MESSAGES.SCHEDULE_GENERATE_SUCCESS);
        setDisplayPopup(false);
        setScreenState(EditScreensState.EDIT_LOCAL);
      })
      .catch((error) => {
        console.log(error);
        setPopupMessage(serverError(error?.response.data.errors[0]));
      });
  };

  return (
    <div className="reg_pageContainer">
      <div className="reg_image">
        <img src={user ? userImg : weeklyLogo} alt="logo" />
      </div>
      <form className="reg_form" onSubmit={onSubmit} onReset={onCancel}>
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
                disabled={
                  screenState === EditScreensState.EDIT_LOCAL ||
                  currInputFields[fieldKey]?.disabled
                }
              />
            );
          })}
        </div>
        {screenState === EditScreensState.ADD ? (
          <button className="btn btn__primary reg_form_btn" type="submit">
            Lets start planning!
          </button>
        ) : screenState === EditScreensState.EDIT ? (
          <div className="buttons_panel">
            <button className="btn btn__primary action-btn" type="submit">
              Save
            </button>
            <button className="btn btn__secondary action-btn" type="reset">
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn__primary reg_form_btn" type="submit">
            <EditIcon />
            Edit
          </button>
        )}
      </form>
      <AlertPopup />
      <AlgoMessagePopup
        open={displaySchedulePopup}
        onClose={() => setDisplayPopup(false)}
        primaryAction={generateSchedule}
        secondaryAction={() => setDisplayPopup(false)}
      />
    </div>
  );
};

export default PersonalData;

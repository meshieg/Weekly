import "./PersonalData.css";
import SuperInputField from "../../components/SuperInputField/SuperInputField";
import { IInputs, personalDataFields } from "./PersonalDataFields";
import { useEffect, useState } from "react";
import user from "../../assets/images/user.svg";
import { UserService } from "../../services/user.service";
import { IUser } from "../../utils/types";
import useUser from "../../customHooks/useUser";

// import useAlert from "../../customHooks/useAlert";
// import AlertPopup from "../../components/AlertPopup/AlertPopup";
// import { useNavigate } from "react-router";
// import { UserService } from "../../services/user.service";
// import { IUser } from "../../utils/types";
// import useToken from "../../customHooks/useToken";

// import { validateUserInputs } from "../../helpers/functions";
// import moment from "moment";

type ICurrUser = Omit<IUser, "confirmPassword">;

const PersonalData = () => {
//   const navigate = useNavigate();
//   const { setToken } = useToken();
//   const { setAlert } = useAlert();

    const initialValues: IInputs = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        beginDayHour: new Date(0, 0, 0, 0, 0, 0),
        endDayHour: new Date(0, 0, 0, 0, 0, 0),
      };

    const [currUserData, setCurrUserData] = useState<IInputs>(initialValues);
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

    useEffect(() => {
        getCurrUser();
    }, []);

    const getCurrUser = async () => {
        await UserService.getCurrentUser()
        .then((data) => {
            // setToken(data?.token);
            
            setCurrUserData({
                // id: data.id,
                firstName: data.firstName ? data.firstName : initialValues.firstName,
                lastName: data.lastName ? data.lastName : initialValues.lastName,
                email: data.email,
                password: data.password,
                beginDayHour: data.beginDayHour ? data.beginDayHour : initialValues.beginDayHour,
                endDayHour: data.endDayHour? data.endDayHour : initialValues.endDayHour,
            });

            // sessionStorage.setItem("user", JSON.stringify(currUser));
            // navigate("/week");
        })
        .catch((err) => {
            if (err?.response?.data?.errors[0]?.message) {
                console.log(err?.response.data.errors[0].message);
            }
        });
    }

//   const handleRegister = async (event: any) => {
//     event.preventDefault();
//     const newUser: IUser = {
//       firstName: inputValues.firstName,
//       lastName: inputValues.lastName,
//       email: inputValues.email,
//       password: inputValues.password,
//       beginDayHour: parseInt(moment(inputValues.beginDayHour).format("HH")),
//       endDayHour: parseInt(moment(inputValues.endDayHour).format("HH")),
//     };

//     const alertMessage = validateUserInputs({
//       ...newUser,
//       confirmPassword: inputValues.confirmPassword,
//     });

//     if (alertMessage) {
//       setAlert("error", alertMessage);
//       return;
//     }

//     await UserService.register(newUser)
//       .then((data) => {
//         setToken(data?.token);

//         const currUser = {
//           id: data.user.id,
//           firstName: newUser.firstName,
//           lasrName: newUser.lastName,
//           email: newUser.email,
//           beginDayHour: newUser.beginDayHour,
//           endDayHour: newUser.endDayHour,
//         };

//         sessionStorage.setItem("user", JSON.stringify(currUser));
//         navigate("/week");
//       })
//       .catch((err) => {
//         if (err?.response?.data?.errors[0]?.message) {
//           setAlert("error", err?.response.data.errors[0].message);
//         }
//       });
//   };

    const test = () => {
        console.log("submit");
    }

  return (
    <div className="reg_pageContainer">
      <div className="reg_image">
        {/* <img src={require("../../assets/images/logo_no_background.png")} alt="logo" /> */}
        <img src={user} alt="user logo" />
      </div>
      <form className="reg_form" onSubmit={test}>
        <div className="reg_form_fields">
          {Object.keys(personalDataFields).map((field) => {
            const fieldKey = field as keyof IInputs;

            return (
              <SuperInputField
                key={fieldKey}
                id={fieldKey}
                label={personalDataFields[fieldKey]?.label || ""}
                type={personalDataFields[fieldKey]?.type}
                options={personalDataFields[fieldKey]?.options}
                // value={inputValues[fieldKey]}
                value={currUserData[fieldKey]}
                onChange={setValues}
                required={true}
              />
            );
          })}
        </div>
        <button className="btn btn__primary reg_form_btn" type="submit">
          Lets start planning!
        </button>
        {/* <AlertPopup /> */}
      </form>
    </div>
  );
};

export default PersonalData;

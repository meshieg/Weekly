import { ReactComponent as SuccessIcon } from "../assets/icons/successIcon.svg";
import { ReactComponent as WarningSign } from "../assets/icons/warningSign.svg";
import { ServerError, UserMessage, UserMessages } from "./types";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";

const icons = {
  error: <WarningSign />,
  success: <SuccessIcon />,
  info: <WarningSign />,
  start: (
    <CalendarMonthTwoToneIcon
      sx={{ color: "var(--primary-color)", fontSize: "1.8rem" }}
    />
  ),
};

export const USER_MESSAGES: UserMessages = {
  SCHEDULE_GENERATE_SUCCESS: {
    title: "Your week is ready!",
    message: "All of your tasks were scheduled successfully",
    extraMessage: "Come take a look ;)",
    icon: icons["success"],
    primaryButtonText: "OK",
  },
  SCHEDULE_GENERATE_SUCCESS_WITH_MESSAGE: {
    title: "Schedule Generated Successfully!",
    message: (
      <>
        Pay attention, we haven't been able to schedule all of your tasks...
        <br />
        you can always keep track in <b>My Tasks</b> page
      </>
    ),
    icon: icons["success"],
    primaryButtonText: "OK",
  },
  GENERAL_ERROR: {
    title: "Oops, something went wrong...",
    message:
      "We're having a problem fetching your data, try to refresh the page",
    icon: icons["error"],
    primaryButtonText: "OK",
  },
  DELETE_CONFIRMATION_MESSAGE: {
    message: (
      <>
        Pay attention, this task/event will be deleted permanently.
        <br />
        <b>Are you sure you want to delete it?</b>
      </>
    ),
    icon: icons["info"],
    primaryButtonText: "Yes",
    secondaryButtonText: "No",
  },
  NEW_ITEMS_CANCEL_MESSAGE: {
    message: (
      <>
        Pay attention, this operation will undo all your new added items.
        <br />
        <b>Are you sure you want to undo?</b>
      </>
    ),
    icon: icons["info"],
    primaryButtonText: "Yes",
    secondaryButtonText: "Cancel",
  },
  FIRST_TIME_MESSAGE: {
    title: "Welcome to Weekly!",
    message: "The best place to optimize your day ⭐",
    extraMessage:
      "Add your tasks and events, and let us do our generation magic!",
    icon: icons["start"],
    primaryButtonText: "Ok",
  },
};

export const serverError = (error: ServerError): UserMessage => {
  return {
    title: "Oops, something went wrong...",
    message: error.message,
    extraMessage: error.extraMessage,
    icon: icons["error"],
    primaryButtonText: "OK",
  };
};

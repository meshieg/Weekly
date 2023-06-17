import { ReactElement } from "react";
import AddTaskPage from "./pages/AddTask/AddTaskPage";
import MyTasks from "./pages/MyTasks/MyTasks";
import WeeklySchedule from "./pages/WeeklySchedule/WeeklySchedule";
import AddEventPage from "./pages/AddEvent/AddEventPage";
import LogIn from "./pages/LogIn/LogIn";
import NewItemsList from "./pages/NewItemsList/NewItemsList";
import DailySchedule from "./pages/DailySchedule/DailySchedule";
import MyProfile from "./pages/MyProfile/MyProfile";
import PersonalData from "./pages/PersonalData/PersonalData";
import { UserState } from "./utils/constants";
import DisplayTaskPage from "./pages/DisplayItem/DisplayTaskPage";
import DisplayEventPage from "./pages/DisplayItem/DisplayEventPage";
import MyTagsPage from "./pages/MyTags/MyTagsPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

type RouteType = {
  path: string;
  element: ReactElement;
  showBottomToolbar?: boolean;
  showToolbar?: boolean;
  showFab?: boolean;
  allowedUserState: UserState;
};

export const routes: RouteType[] = [
  {
    path: "/",
    element: <WeeklySchedule />,
    showBottomToolbar: true,
    showToolbar: false,
    showFab: true,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/add-task",
    element: <AddTaskPage />,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/add-event",
    element: <AddEventPage />,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
  // {
  //   path: "/week",
  //   element: <WeeklySchedule />,
  //   showBottomToolbar: true,
  //   showToolbar: false,
  //   showFab: true,
  // },
  {
    path: "/day",
    element: <DailySchedule />,
    showBottomToolbar: true,
    showToolbar: true,
    showFab: true,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/my-tasks",
    element: <MyTasks />,
    showBottomToolbar: true,
    showToolbar: true,
    showFab: true,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/login",
    element: <LogIn />,
    showToolbar: false,
    showFab: false,
    allowedUserState: UserState.NOT_SIGNED,
  },
  {
    path: "/register",
    element: <PersonalData />,
    showToolbar: false,
    showFab: false,
    allowedUserState: UserState.NOT_SIGNED,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
    showToolbar: false,
    showFab: false,
    allowedUserState: UserState.NOT_SIGNED,
  },
  {
    path: "/new-tasks",
    element: <NewItemsList />,
    showBottomToolbar: false,
    showToolbar: true,
    showFab: true,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/display-task",
    element: <DisplayTaskPage />,
    showBottomToolbar: false,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/display-event",
    element: <DisplayEventPage />,
    showBottomToolbar: false,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
    showBottomToolbar: true,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/my-profile/my-tags",
    element: <MyTagsPage />,
    showBottomToolbar: false,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
  {
    path: "/my-profile/personal-data",
    element: <PersonalData />,
    showBottomToolbar: false,
    showToolbar: true,
    showFab: false,
    allowedUserState: UserState.SIGNED,
  },
];

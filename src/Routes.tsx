import { ReactElement } from "react";
import AddTaskPage from "./pages/AddTask/AddTaskPage";
import Home from "./pages/Home/Home";
import MyTasks from "./pages/MyTasks/MyTasks";
import WeeklySchedule from "./pages/WeeklySchedule/WeeklySchedule";
import AddEventPage from "./pages/AddEvent/AddEventPage";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import NewItemsListPage from "./pages/NewItemsList/NewItemsListPage";
import DailySchedule from "./pages/DailySchedule/DailySchedule";

type RouteType = {
  path: string;
  element: ReactElement;
  showBottomToolbar?: boolean;
  showToolbar?: boolean;
  showFab: boolean;
};

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
    showBottomToolbar: true,
    showToolbar: true,
    showFab: true
  },
  {
    path: "/add-task",
    element: <AddTaskPage />,
    showToolbar: true,
    showFab: false
  },
  {
    path: "/add-event",
    element: <AddEventPage />,
    showToolbar: true,
    showFab: false
  },
  {
    path: "/week",
    element: <WeeklySchedule />,
    showBottomToolbar: true,
    showToolbar: false,
    showFab: true
  },
  {
    path: "/day",
    element: <DailySchedule date={new Date()} />, // TODO: maybe put the clicked date in a context?
    showBottomToolbar: true,
    showToolbar: true,
  },
  {
    path: "/my-tasks",
    element: <MyTasks />,
    showBottomToolbar: true,
    showToolbar: true,
    showFab: true
  },
  {
    path: "/logIn",
    element: <LogIn />,
    showToolbar: false,
    showFab: false
  },
  {
    path: "/register",
    element: <Register />,
    showToolbar: false,
    showFab: false
  },
  {
    path: "/new-tasks",
    element: <NewItemsListPage />,
    showBottomToolbar: false,
    showToolbar: true,
    showFab: true
  },
];

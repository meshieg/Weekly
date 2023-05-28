import { ReactElement } from "react";
import AddTaskPage from "./pages/AddTask/AddTaskPage";
import Home from "./pages/Home/Home";
import MyTasks from "./pages/MyTasks/MyTasks";
import WeeklySchedule from "./pages/WeeklySchedule/WeeklySchedule";
import AddEventPage from "./pages/AddEvent/AddEventPage";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import NewItemsListPage from "./pages/NewItemsList/NewItemsListPage";
import DisplayItemPage from "./pages/EditShowEvent/displayItemPage";
import DisplayTaskPage from "./pages/DisplayItem/DisplayTaskPage";
import DisplayEventPage from "./pages/DisplayItem/DisplayEventPage";

type RouteType = {
  path: string;
  element: ReactElement;
  showBottomToolbar?: boolean;
  showToolbar?: boolean;
};

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
    showBottomToolbar: true,
    showToolbar: true,
  },
  {
    path: "/add-task",
    element: <AddTaskPage />,
    showToolbar: true,
  },
  {
    path: "/add-event",
    element: <AddEventPage />,
    showToolbar: true,
  },
  {
    path: "/week",
    element: <WeeklySchedule />,
    showBottomToolbar: true,
    showToolbar: false,
  },
  {
    path: "/my-tasks",
    element: <MyTasks />,
    showBottomToolbar: true,
    showToolbar: true,
  },
  {
    path: "/logIn",
    element: <LogIn />,
    showToolbar: false,
  },
  {
    path: "/register",
    element: <Register />,
    showToolbar: false,
  },
  {
    path: "/new-tasks",
    element: <NewItemsListPage />,
    showBottomToolbar: false,
    showToolbar: true,
  },
  {
    path: "/display-task",
    element: <DisplayTaskPage />,
    showBottomToolbar: false,
    showToolbar: true,
  },
  {
    path: "/display-event",
    element: <DisplayEventPage />,
    showBottomToolbar: false,
    showToolbar: true,
  },
];

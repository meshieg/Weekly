import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTaskPage from "./pages/AddTask/AddTaskPage";
import Home from "./pages/Home/Home";
import MyTasks from "./pages/MyTasks/MyTasks";
import WeeklySchedule from "./pages/WeeklySchedule/WeeklySchedule";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";

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
    path: "/addTask",
    element: <AddTaskPage />,
    showToolbar: true,
  },
  {
    path: "/week",
    element: <WeeklySchedule />,
    showBottomToolbar: true,
    showToolbar: false,
  },
  {
    path: "/myTasks",
    element: <MyTasks />,
    showBottomToolbar: true,
    showToolbar: true,
  },
  {
    path: "/logIn",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

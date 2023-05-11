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
};

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addTask",
    element: <AddTaskPage />,
  },
  {
    path: "/week",
    element: <WeeklySchedule />,
  },
  {
    path: "/myTasks",
    element: <MyTasks />,
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

// const Router = ({children: ReactElement}) => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {routes.map((route) => (
//           <Route key={route.path} path={route.path} element={route.element} />
//         ))}
//       </Routes>
//     </BrowserRouter>
//   );
// };

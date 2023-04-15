import { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTaskPage from "./pages/AddTask/AdddTaskPage";
import AddedTasksGroupPage from "./pages/AddedTasksGroup/AddedTasksGroupPage";
import Home from "./pages/Home/Home";

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
    path: "addedTasks",
    element: <AddedTasksGroupPage />
  }
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React, { useState, useCallback, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import useToolbar from "../../customHooks/useToolbar";
import { routes } from "../../Routes";

const actions = [
  {
    label: "My Profile",
    icon: <AccountCircleIcon />,
    to: "/", // TODO: change the route
  },
  {
    label: "My Week",
    icon: <EventIcon />,
    to: "/week",
  },
  {
    label: "My Tasks",
    icon: <FormatListNumberedIcon />,
    to: "/my-tasks",
  },
];

const BottomToolbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { clearToolbar } = useToolbar();
  const [show, setShow] = useState(false);
  const location = useLocation();

  const onNavigate = useCallback(
    (event: any, newValue: number) => {
      clearToolbar();
      setValue(newValue);
      navigate(actions[newValue].to);
    },
    [navigate, clearToolbar]
  );

  useEffect(() => {
    const actionIndex = actions.findIndex(
      (action) => action.to === location.pathname
    );

    const route = routes.find((route) => route.path === location.pathname);
    setShow(
      route?.showBottomToolbar !== undefined ? route?.showBottomToolbar : false
    );

    setValue((prev) => (actionIndex >= 0 ? actionIndex : prev));
  }, [location.pathname]);

  if (!show) return <></>;

  return (
    <div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={onNavigate}
        sx={{
          "&.MuiBottomNavigation-root": {
            background: "#FBFBFF",
            height: "8vh",
          },
          "& .Mui-selected": {
            color: "var(--primary-color)",
          },
          "& .Mui-selected svg": {
            color: "var(--primary-color)",
          },
        }}
      >
        {actions.map((action) => (
          <BottomNavigationAction
            key={action.to}
            id={action.label}
            label={action.label}
            icon={action.icon}
          />
        ))}
      </BottomNavigation>
    </div>
  );
};

export default React.memo(BottomToolbar);

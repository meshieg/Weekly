import React, { useState, useCallback } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useNavigate } from "react-router-dom";

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
    to: "/myTasks",
  },
];

const BottomToolbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const onNavigate = useCallback((event: any, newValue: number) => {
    setValue(newValue);
    navigate(actions[newValue].to);
  }, []);

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

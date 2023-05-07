import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar as MuiToolbar,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useToolbar from "../../customHooks/useToolbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./Toolbar.css";
import { routes } from "../../Routes";

const Toolbar: React.FC = () => {
  const { toolbar, clearToolbar } = useToolbar();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    clearToolbar();
    const route = routes.find((route) => route.path === location.pathname);
    setShow(route?.showToolbar !== undefined ? route?.showToolbar : true);
  }, [location.pathname]);

  if (!show) return <></>;

  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{
          "& .MuiToolbar-root": {
            backgroundColor: "#FFFFFF",
            color: "var(--primary-color)",
            minHeight: "7vh",
          },
        }}
      >
        <MuiToolbar>
          <div className="toolbar__container">
            {toolbar.backButton && (
              <IconButton
                size="large"
                edge="start"
                onClick={() => navigate(-1)}
                sx={{
                  position: "absolute",
                  left: "1rem",
                  // color: "var(--primary-color)",
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div">
              {toolbar.title}
            </Typography>
          </div>
        </MuiToolbar>
      </AppBar>
      <MuiToolbar sx={{ marginBottom: "1vh" }} />
    </>
  );
};

export default Toolbar;

import {
  AppBar,
  IconButton,
  Typography,
  Toolbar as MuiToolbar,
} from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "./Toolbar.css";
import useToolbar from "../../customHooks/useToolbar";

const Toolbar: React.FC = () => {
  const { toolbar } = useToolbar();

  return (
    <>
      {toolbar.show && (
        <>
          <AppBar
            color="inherit"
            position="fixed"
            sx={{
              "& .MuiToolbar-root": {
                backgroundColor: "#FFFFFF",
                color: "var(--primary-color)",
                minHeight: "7vh",
                // marginBottom: "1vh",
              },
            }}
          >
            <MuiToolbar>
              <div className="toolbar__container">
                {toolbar.backButton && (
                  <IconButton
                    size="large"
                    edge="start"
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
      )}
    </>
  );
};

export default Toolbar;

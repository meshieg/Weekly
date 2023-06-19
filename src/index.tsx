import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <GoogleOAuthProvider clientId="601541058375-urmmdgs0qukjjfv7716g8e8sk6p1qtat.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // </GoogleOAuthProvider>
);

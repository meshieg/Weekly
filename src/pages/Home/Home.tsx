import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

  return (
    <>
      <h1>Weekly</h1>
      <Link to="/addTask">
        <button className="btn btn__primary" style={{ margin: "2rem" }}>כפתור ראשי</button>
      </Link>
      <Link to="/addedTasks">
        <button className="btn btn__secondary">כפתור משני</button>
      </Link>
    </>
  );
};

export default Home;

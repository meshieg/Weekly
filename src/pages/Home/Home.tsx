import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Weekly</h1>
      <Link to="./add-task">
        <button className="btn btn__primary" style={{ margin: "2rem" }}>
          הוסף משימה
        </button>
      </Link>
    </div>
  );
};

export default Home;

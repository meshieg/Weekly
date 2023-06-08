import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import AlgoMessagePopup from "../../components/AlgoMessagePopup/AlgoMessagePopup";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Weekly</h1>
      <Link to="./add-task">
        <button className="btn btn__primary" style={{ margin: "2rem" }}>
          Add task
        </button>
      </Link>
      <Link to="./add-event">
        <button className="btn btn__primary" style={{ margin: "2rem" }}>
          Add event
        </button>
      </Link>
      <button
        className="btn btn__primary"
        style={{ margin: "2rem" }}
        onClick={() => setOpen(true)}
      >
        popup
      </button>
      <AlgoMessagePopup
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default Home;

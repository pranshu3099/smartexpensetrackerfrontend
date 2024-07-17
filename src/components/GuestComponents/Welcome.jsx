import "./guest.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
const Welcome = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      {
        <div className="main-container">
          <div className="welcome-container">
            <h1>Welcome</h1>
            <p>To Expense Manager</p>
          </div>

          <div className="welcome-sub-container">
            <p>Let's organize your financial life</p>
            <button className="signup-button" onClick={handleShow}>
              Sign-up
            </button>
            <p>
              ALREADY A MEMBER?{" "}
              <a href="/smartexpensetracker/login" className="login">
                Login
              </a>
            </p>
          </div>
        </div>
      }

      {show && <Navigate to={"/smartexpensetracker/signup"} />}
    </>
  );
};

export default Welcome;

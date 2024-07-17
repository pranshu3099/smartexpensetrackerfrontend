import { Button, Input } from "@chakra-ui/react";
import "../../components/Loading/loading.css";
import { useReducer, useRef, useState } from "react";
import Loading from "../Loading/loading";
import axios from "axios";
import { passwordValidate, emailValidate } from "../../regex/regex";
import hidden from "../../icons/eye-slash-svgrepo-com.svg";
import email from "../../icons/mail-svgrepo-com.svg";
import eye from "../../icons/eye-svgrepo-com.svg";
import "./login.css";
import { Navigate } from "react-router-dom";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const Login = () => {
  const signupReducer = (state, action) => {
    switch (action.type) {
      case "email":
        if (!emailValidate(action.email)) {
          return {
            ...state,
            email: action.email,
            emailValidation: action.emailValidation,
          };
        }
        return {
          ...state,
          email: action.email,
          emailValidation: false,
        };
      case "password":
        if (!passwordValidate(action.password)) {
          return {
            ...state,
            password: action.password,
            passwordValidation: action.passwordValidation,
          };
        }

        return {
          ...state,
          password: action.password,
          passwordValidation: false,
        };
      default:
        throw new Error("type not matched");
    }
  };
  const fetchdata = (info) => {
    try {
      axios.post(`${react_api_url}/v1/user/login`, info).then((response) => {
        if (response.status === 200) {
          console.log(response?.data);
          localStorage.setItem("authmethod", "email");
          localStorage.setItem(
            "userdata",
            JSON.stringify(response?.data?.userdata)
          );
          localStorage.setItem("Bearer", response?.data?.Authorization);
          setAuth(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  function checkRequiredFields(info) {
    const res = {};
    Object.keys(info).forEach((key) => {
      if (info[key] === "") {
        res[key] = true;
      }
    });
    if (Object.keys(res).length) {
      setRequireFields(res);
      return false;
    } else {
      setRequireFields({});
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    if (checkRequiredFields(info)) {
      let user_info = [];
      user_info.push(info);
      localStorage.setItem("user_info", JSON.stringify(user_info));
      setLoading(true);
      fetchdata(info);
    }
  };

  const showPassword = (e) => {
    if (InputRef.current.type === "password") {
      InputRef.current.type = "text";
      setIsPasswordVisible(true);
    } else {
      InputRef.current.type = "password";
      setIsPasswordVisible(false);
    }
  };

  const [requiredFields, setRequireFields] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const InputRef = useRef(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(signupReducer, {
    email: "",
    password: "",
    emailValidation: false,
    passwordValidation: false,
  });
  return (
    <>
      {loading && <Loading />}
      <div className="login-main-container">
        <h1>Login to Smart Expense Tracker</h1>
        <form action="">
          <div className="login-input-container">
            <div className="login-input-sub-container">
              <Input
                variant="flushed"
                placeholder="email"
                type="email"
                name="email"
                value={state.email}
                onChange={(e) => {
                  dispatch({
                    ...state,
                    email: e.target.value,
                    type: "email",
                    emailValidation: true,
                  });
                }}
              />
              <img src={email} className="icon" />
            </div>

            <div className="login-error-container">
              {state.emailValidation && (
                <p style={{ color: "red" }}>Invalid email address</p>
              )}{" "}
              {requiredFields.email && (
                <p style={{ color: "red" }}> Email address is required</p>
              )}
            </div>
            <div className="login-input-sub-container">
              <Input
                variant="flushed"
                placeholder="password"
                type="password"
                name="password"
                ref={InputRef}
                onChange={(e) => {
                  dispatch({
                    ...state,
                    password: e.target.value,
                    type: "password",
                    passwordValidation: true,
                  });
                }}
              />
              <img
                src={isPasswordVisible ? hidden : eye}
                className="icon"
                onClick={(e) => {
                  showPassword(e);
                }}
              />
            </div>

            <div className="signup-error-container">
              {state.passwordValidation && (
                <p style={{ color: "red" }} className="signup-error">
                  Invalid password
                </p>
              )}
              {requiredFields.password && (
                <p style={{ color: "red" }} className="signup-error">
                  {" "}
                  Password is required
                </p>
              )}
            </div>
            <Button className="register-button" onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </form>
      </div>
      {auth && <Navigate to="/smartexpensetracker/home" />}
    </>
  );
};

export default Login;

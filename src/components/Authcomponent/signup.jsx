import "./signup.css";
import "../../components/Loading/loading.css";
import { Input, Button } from "@chakra-ui/react";
import { useReducer, useRef, useState } from "react";
import Loading from "../Loading/loading";
import axios from "axios";
import github from "../../icons/github-142-svgrepo-com.svg";
import hidden from "../../icons/eye-slash-svgrepo-com.svg";
import email from "../../icons/mail-svgrepo-com.svg";
import eye from "../../icons/eye-svgrepo-com.svg";
import user from "../../icons/person-svgrepo-com.svg";
import rupees from "../../icons/rupee-svgrepo-com.svg";

import {
  nameValidate,
  passwordValidate,
  emailValidate,
  incomeValidate,
} from "../../regex/regex";

import { Navigate } from "react-router-dom";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const CLIENT_ID = import.meta.env.VITE_PUBLIC_CLIENT_ID;
const REDIRECT_URL = `${react_api_url}/api/auth/github`;

const Signup = () => {
  const signupReducer = (state, action) => {
    switch (action.type) {
      case "name":
        if (!nameValidate(action.name)) {
          return {
            ...state,
            name: action.name,
            nameValidation: action.nameValidation,
          };
        }
        return { ...state, name: action.name, nameValidation: false };
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
      case "income":
        if (!incomeValidate(action.income)) {
          return {
            ...state,
            income: action.income,
            incomeValidation: action.incomeValidation,
          };
        }

        return {
          ...state,
          income: action.income,
          incomeValidation: false,
        };
      default:
        throw new Error("type not matched");
    }
  };

  const fetchdata = (info) => {
    try {
      axios.post(`${react_api_url}/v1/user/signup`, info).then((response) => {
        if (response.status === 201) {
          console.log(response?.data);
          setAuth(true);
          setData(response?.data);
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
      income_per_month: state.income,
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
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [data, setData] = useState({});
  const InputRef = useRef(null);
  const [state, dispatch] = useReducer(signupReducer, {
    name: "",
    email: "",
    password: "",
    income: "",
    nameValidation: false,
    emailValidation: false,
    passwordValidation: false,
    incomeValidation: false,
  });
  const path = "smartexpensetracker/home";
  return (
    <>
      {loading && <Loading />}
      <div className="signup-main-container">
        <h2>Signup to smart expense tracker</h2>
        <div className="github-icon-container">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}?path=${path}&scope=user:email`}
          >
            Login via github
          </a>
          <img src={github} className="github-icon" />
        </div>
        <form action="">
          <div className="signup-input-container">
            <div className="signup-input-sub-container">
              <Input
                variant="flushed"
                placeholder="name"
                type="text"
                name="name"
                value={state.name}
                onChange={(e) => {
                  dispatch({
                    ...state,
                    name: e.target.value,
                    type: "name",
                    nameValidation: true,
                  });
                }}
              />
              <img src={user} className="icon" />
            </div>

            <div className="signup-error-container">
              {state.nameValidation && (
                <p style={{ color: "red" }} className="signup-error">
                  Invalid Name
                </p>
              )}
              {requiredFields.name && (
                <p style={{ color: "red" }} className="signup-error">
                  Name field is required
                </p>
              )}
            </div>
            <div className="signup-input-sub-container">
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

            <div className="signup-error-container">
              {state.emailValidation && (
                <p style={{ color: "red" }} className="signup-error">
                  Invalid email address
                </p>
              )}{" "}
              {requiredFields.email && (
                <p style={{ color: "red" }} className="signup-error">
                  {" "}
                  Email address is required
                </p>
              )}
            </div>
            <div className="signup-input-sub-container">
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

            <div className="signup-input-sub-container">
              <Input
                variant="flushed"
                placeholder="income per month"
                type="text"
                name="income"
                ref={InputRef}
                onChange={(e) => {
                  dispatch({
                    ...state,
                    income: e.target.value,
                    type: "income",
                    incomeValidation: true,
                  });
                }}
              />
              <img src={rupees} className="icon" />
            </div>

            <div className="signup-error-container">
              {state.incomeValidation && (
                <p style={{ color: "red" }} className="signup-error">
                  Invalid income
                </p>
              )}
              {requiredFields.income_per_month && (
                <p style={{ color: "red" }} className="signup-error">
                  {" "}
                  Income is required
                </p>
              )}
            </div>

            <Button className="register-button" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </form>
      </div>
      {auth && (
        <Navigate
          to="/smartexpensetracker/login"
          state={{ user: data?.user }}
        />
      )}
    </>
  );
};

export default Signup;

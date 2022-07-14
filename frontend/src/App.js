import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Navbar from "./components/Navbar";

import {
  authenticated_fail,
  authenticated_success,
  loadin,
  loadin_fail,
} from "./features/user";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

import "./styles/styles.css";

import PasswordReset from "./auth-components/PasswordReset";
import PasswordResetConfirm from "./auth-components/PasswordResetConfirm";
import Login from "./auth-components/Login";
import Activate from "./auth-components/Activate";
import Signup from "./auth-components/Signup";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function check_auth() {
      console.log("Authentication Check")
      if (localStorage.getItem("access")) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };

        const body = JSON.stringify({ token: localStorage.getItem("access") });
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
            body,
            config
          );
          if (res.data.code !== "token_not_valid") {
            dispatch(authenticated_success());
            load_user()
          } else {
            dispatch(authenticated_fail());
          }
        } catch (err) {
          dispatch(authenticated_fail());
        }
      } else {
        console.log("Authentication Error");
      }
    }
    check_auth();
  });

  async function load_user() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/users/me/`,
          config
        );
        dispatch(loadin(res.data));
      } catch (err) {
        dispatch(loadin_fail());
      }
    } else {
      dispatch(loadin_fail());
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="password/reset" element={<PasswordReset />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

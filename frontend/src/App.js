import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import "./styles/styles.css";

import PasswordReset from "./auth-components/PasswordReset";
import PasswordResetConfirm from "./auth-components/PasswordResetConfirm";
import Login from "./auth-components/Login";
import Activate from "./auth-components/Activate";
import Signup from "./auth-components/Signup";
import Profile from "./pages/Profile";

import {check_auth} from './auth-reducers/AuthReducers'


function App() {
  const dispatch = useDispatch();

  //checks authentication
  useEffect(() => {
    // check_auth(dispatch);
  });

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="activate/:uid/:token" element={<Activate />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="password/reset" element={<PasswordReset />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
        <Route path="profile/:name" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

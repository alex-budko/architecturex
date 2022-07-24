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


import BarChart from "./pages/charts/BarChart";
import LineChart from "./pages/charts/LineChart";


import {check_auth} from './auth-reducers/AuthReducers'
import Charts from "./pages/charts/Charts";

function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    check_auth(dispatch)
  })

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
        <Route path='chart'>
          <Route path='line' element={<LineChart />} />
          <Route path='bar' element={<BarChart />}/>
        </Route>
        <Route path="profile/:name" element={<Profile />} />
        <Route path="charts/:name" element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

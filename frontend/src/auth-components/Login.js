import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loadin, loadin_fail, login, login_fail } from "../features/user";
import axios from "axios";
import { Navigate } from "react-router-dom";
import FormCreator from "../utils/FormCreator";

function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const [invalid, setInvalid] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setInvalid(false);
    log_user(email, password);
    if (!isAuthenticated) {
      setTimeout(() => {
        setFormData({ email: "", password: "" });
        setInvalid(true);
      }, 500);
    }
  };

  async function log_user(email, password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
        body,
        config
      );
      dispatch(login(res.data));
      load_user();
    } catch (err) {
      dispatch(login_fail());
    }
  }

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
  const groups = {
    email: {
      name: 'email',
      controlId: 'Email',
      label: 'Email',
      isInvalid: 'false',
      pattern: 'r/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
      value: email,
      muted: true,
      mutedText: `We'll never share your email with anyone else`
    },
    password: {
      name: 'password',
      controlId: 'Password',
      label: 'Password',
      isInvalid: invalid,
      pattern: '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
      value: password,
      muted: false,
    },
  }
  return (
    <FormCreator
      groups={groups}
      onSubmit={onSubmit}
      submit='Sign In'
      changeInfo={changeInfo}
    />
  );
}

export default Login;

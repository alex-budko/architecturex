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
      type: 'email',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$',
      isInvalid: false,
      value: email,
      muted: true,
      mutedText: `We'll never share your email with anyone else`
    },
    password: {
      name: 'password',
      controlId: 'Password',
      label: 'Password',
      type: 'password',
      isInvalid: invalid,
      pattern: "[A-Za-z0-9_!]{8,29}",
      value: password,
      muted: false,
    },
  }
  return (
    <FormCreator
      login={true}
      groups={groups}
      onSubmit={onSubmit}
      submit='Sign In'
      changeInfo={changeInfo}
    />
  );
}

export default Login;

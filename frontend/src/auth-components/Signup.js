import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup, signup_fail } from "../features/user";
import axios from "axios";
import { Navigate } from "react-router-dom";

import FormCreator from "../utils/FormCreator";


function Signup() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  //validation
  const [invalid, setValidPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { name, email, password, re_password } = formData;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      setValidPassword(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        re_password: "",
      });
    } else {
      setValidPassword(false);
      sign_up(name, email, password, re_password);
    }
  };

  async function sign_up(name, email, password, re_password) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );
      dispatch(signup(res.data));
    } catch (err) {
      dispatch(signup_fail());
    }
  }

  const groups = {
    email: {
      name: 'email',
      controlId: 'Email',
      label: 'Email',
      isInvalid: 'false',
      pattern: '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
      value: email,
      muted: true,
      mutedText: `We'll never share your email with anyone else`
    },
    name: {
      name: 'name',
      controlId: 'Name',
      label: 'Name',
      isInvalid: 'false',
      pattern: '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$',
      value: name,
      muted: true,
      mutedText: 'Your name must be 8-20 characters long, and only contain alphanumeric characters, underscores, and periods; however, it may not begin with or have adjacent underscores or periods (e.g. _john or john_._ are not allowed).'
    },
    password: {
      name: 'password',
      controlId: 'Password',
      label: 'Password',
      isInvalid: invalid,
      pattern: '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
      value: password,
      muted: true,
      mutedText: 'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.'
    },
    re_password: {
      name: 're_password',
      controlId: 'Re_Password',
      label: 'Repeat Password',
      isInvalid: invalid,
      pattern: '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
      value: re_password,
      muted: false,
    },
  }

  return (
    <FormCreator
      groups={groups}
      onSubmit={onSubmit}
      submit={'Sign Up'}
      changeInfo={changeInfo}
    />
  );
}

export default Signup;

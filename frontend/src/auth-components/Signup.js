import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Navigate } from "react-router-dom";

import FormCreator from "../utils/FormCreator";
import { sign_up } from "../auth-reducers/AuthReducers";
import EmailSent from "./EmailSent";

function Signup() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [show, setShow] = useState(false);

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
    setFormData({
      name: "",
      email: "",
      password: "",
      re_password: "",
    });
    if (password !== re_password) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
      setShow(true);
      sign_up(dispatch, name, email, password, re_password);
    }
  };

  const groups = {
    email: {
      name: "email",
      controlId: "Email",
      type: "email",
      label: "Email",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
      isInvalid: false,
      value: email,
      muted: true,
      mutedText: `We'll never share your email with anyone else`,
    },
    name: {
      name: "name",
      controlId: "Name",
      pattern: "[A-Za-z0-9_]{4,29}",
      type: "text",
      label: "Name",
      isInvalid: false,
      value: name,
      muted: true,
      mutedText: `Your username must be at least 4 characters long`,
    },
    password: {
      name: "password",
      controlId: "Password",
      label: "Password",
      type: "password",
      isInvalid: invalid,
      pattern: "[A-Za-z0-9_!]{8,29}",
      value: password,
      muted: true,
      mutedText:
        "Your password must be 8-20 chars. long, contain letters and numbers, but can't contain spaces or other characters.",
    },
    re_password: {
      name: "re_password",
      controlId: "Re_Password",
      type: "password",
      label: "Repeat Password",
      isInvalid: invalid,
      pattern: "[A-Za-z0-9_!]{8,29}",
      value: re_password,
      muted: false,
    },
  };

  return (
    <>
      <FormCreator
        groups={groups}
        onSubmit={onSubmit}
        submit={"Sign Up"}
        changeInfo={changeInfo}
      />
      {show && (
        <EmailSent setShow={setShow} message={"Sign Up"} confirmEmail={true} />
      )}
    </>
  );
}

export default Signup;

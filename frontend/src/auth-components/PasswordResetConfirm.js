import { useDispatch } from "react-redux";

import { useParams } from "react-router";
import { useState } from "react";
import FormCreator from "../utils/FormCreator";

import { reset_password_confirm } from "../auth-reducers/AuthReducers";
import EmailSent from "./EmailSent";

function PasswordResetConfirm() {
  const dispatch = useDispatch();

  const [invalid, setValidPassword] = useState(false);

  const { uid, token } = useParams();

  const [formData, setFormData] = useState({ password: "", re_password: "" });

  const { password, re_password } = formData;

  const [show, setShow] = useState(false);


  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      setShow(true)
      reset_password_confirm(dispatch, uid, token, password, re_password);
    } else {
      setFormData({ password: "", re_password: "" });
      setValidPassword(true);
    }
  };

  const groups = {
    password: {
      name: "password",
      controlId: "Password",
      label: "Password",
      isInvalid: invalid,
      type: "password",
      pattern: "[A-Za-z0-9_!]{8,29}",
      value: password,
      muted: true,
      mutedText:
        "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.",
    },
    re_password: {
      name: "re_password",
      controlId: "Re_Password",
      label: "Repeat Password",
      type: "password",
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
        submit={"Confirm Reset Password"}
        changeInfo={changeInfo}
      />
      {show && <EmailSent setShow={setShow} message={"Reset Confirm"}  confirmEmail={false}/>}
    </>
  );
}

export default PasswordResetConfirm;

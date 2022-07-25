import { useDispatch } from "react-redux";
import { useState } from "react";

import { Navigate } from "react-router-dom";
import FormCreator from "../utils/FormCreator";

import { reset_password } from "../auth-reducers/AuthReducers";
import EmailSent from "./EmailSent";

function PasswordReset() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;
  const [show, setShow] = useState(false);

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(dispatch, email);
    setShow(true);
  };

  const groups = {
    email: {
      name: "email",
      controlId: "Email",
      label: "Email",
      type: "email",
      isInvalid: false,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
      value: email,
      muted: true,
      mutedText: `We'll never share your email with anyone else`,
    },
  };
  return (
    <>
      <FormCreator
        groups={groups}
        onSubmit={onSubmit}
        submit={"Reset Password"}
        changeInfo={changeInfo}
      />
      {show && <EmailSent setShow={setShow} message={"Password Reset"} confirmEmail={true} />}
    </>
  );
}

export default PasswordReset;

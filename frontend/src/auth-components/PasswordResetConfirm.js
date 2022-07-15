import { useDispatch } from "react-redux";
import {
  password_reset_confirm_success,
  password_reset_confirm_fail,
} from "../features/user";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import FormCreator from "../utils/FormCreator";


function PasswordResetConfirm() {
  const dispatch = useDispatch();


  const [invalid, setValidPassword] = useState(false);

  const { uid, token } = useParams();

  const [formData, setFormData] = useState({ password: "", re_password: "" });

  const { password, re_password } = formData;

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      reset_password_confirm(uid, token, password, re_password);
    } else {
      setFormData({ password: "", re_password: "" });
      setValidPassword(true)
    }
  };

  async function reset_password_confirm(
    uid,
    token,
    new_password,
    re_new_password
  ) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch(password_reset_confirm_success());
    } catch (err) {
      dispatch(password_reset_confirm_fail());
    }
  }

  const groups = {
    password: {
      name: 'password',
      controlId: 'Password',
      label: 'Password',
      isInvalid: invalid,
      type: 'password',
      pattern: '[A-Za-z0-9_!]{8,29}',
      value: password,
      muted: true,
      mutedText: 'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.'
    },
    re_password: {
      name: 're_password',
      controlId: 'Re_Password',
      label: 'Repeat Password',
      type: 'password',
      isInvalid: invalid,
      pattern: '[A-Za-z0-9_!]{8,29}',
      value: re_password,
      muted: false,
    },
  }
  
  return (
    <FormCreator
      groups={groups}
      onSubmit={onSubmit}
      submit={'Confirm Reset Password'}
      changeInfo={changeInfo}
    />
  );
}

export default PasswordResetConfirm;

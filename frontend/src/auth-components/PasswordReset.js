import { useDispatch } from "react-redux";
import { useState } from "react";
import { password_reset_fail, password_reset_success } from "../features/user";
import axios from "axios";
import { Navigate } from "react-router-dom";
import FormCreator from "../utils/FormCreator";

function PasswordReset() {
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({ email: "" });
  const [requestSent, setRequestSent] = useState(false);
  const { email } = formData;
  
  if (requestSent) {
    return <Navigate to="/" />;
  }

  const changeInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
    console.log("Surely");
  };

  async function reset_password(email) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
        body,
        config
      );
      dispatch(password_reset_success());
    } catch (err) {
      dispatch(password_reset_fail());
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
  }
  return (
    <FormCreator 
      groups={groups}
      onSubmit={onSubmit}
      submit={'Reset Password'}
      changeInfo={changeInfo}
    />
  );
}

export default PasswordReset;

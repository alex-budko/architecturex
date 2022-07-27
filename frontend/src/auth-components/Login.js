import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import FormCreator from "../utils/FormCreator";
import { log_user } from "../auth-reducers/AuthReducers";
import { Center, Heading, Stack } from "@chakra-ui/react";

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
    log_user(dispatch, email, password);
    if (!isAuthenticated) {
      setTimeout(() => {
        setFormData({ email: "", password: "" });
        setInvalid(true);
      }, 500);
    }
  };

  const groups = {
    email: {
      name: "email",
      controlId: "Email",
      label: "Email",
      type: "email",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
      isInvalid: false,
      value: email,
      muted: true,
      mutedText: `We'll never share your email with anyone else`,
    },
    password: {
      name: "password",
      controlId: "Password",
      label: "Password",
      type: "password",
      isInvalid: invalid,
      pattern: "[A-Za-z0-9_!]{8,29}",
      value: password,
      muted: false,
    },
  };
  return (
    <FormCreator
      login={true}
      groups={groups}
      onSubmit={onSubmit}
      submit="Sign In"
      changeInfo={changeInfo}
    />
  );
}

export default Login;

import {
  authenticated_fail,
  authenticated_success,
  signup,
  signup_fail,
  profilecreate,
  profilecreate_fail,
  loadin,
  loadin_fail,
  login,
  login_fail,
  password_reset_fail,
  password_reset_success,
  password_reset_confirm_success,
  password_reset_confirm_fail,
  activation_fail,
  activation_success,
} from "../features/user";

import axios from "axios";

export async function sign_up(dispatch, name, email, password, re_password) {
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
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    dispatch(signup(res.data));
  } catch (err) {
    dispatch(signup_fail());
  }
}

export async function verify(dispatch, uid, token) {
  console.log("verifying");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid: uid, token: token });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    try {
      profile_create(dispatch);
    } catch (err) {
      dispatch(activation_fail());
    }

    dispatch(activation_success());

  } catch (err) {
    dispatch(activation_fail());
  }
}

export async function log_user(dispatch, email, password) {
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

    try {
      load_user(dispatch);
    } catch (err) {
      dispatch(login_fail());
    }
  } catch (err) {
    dispatch(login_fail());
  }
}

export async function load_user(dispatch) {
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

export async function reset_password(dispatch, email) {
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

export async function reset_password_confirm(
  dispatch,
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

export async function check_auth(dispatch) {
  console.log("Authentication Check");
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.data.code !== "token_not_valid") {
        dispatch(authenticated_success());
        load_user(dispatch);
      } else {
        dispatch(authenticated_fail());
      }
    } catch (err) {
      dispatch(authenticated_fail());
    }
  } else {
    console.log("Authentication Error");
  }
}

async function profile_create(dispatch) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user: localStorage.getItem("name"),
    email: localStorage.getItem('email'),
  });
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/create/profile/`,
      body,
      config
    )
    dispatch(profilecreate());
  } catch (err) {
    dispatch(profilecreate_fail());
  }
}

export async function profile_view(name) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user: name,
  });
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/${name}/`,
      body,
      config
    )
    return res
  } catch (err) {
  }
}

export async function profile_update(name, email, description) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user: name,
    email: email, 
    description: description
  });
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/profile/${name}/`,
      body,
      config
    )
    return res
  } catch (err) {
  }
}
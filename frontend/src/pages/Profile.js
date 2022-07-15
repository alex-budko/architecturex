import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

function Profile() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  }

  return <div>Profile</div>;
}

export default Profile;

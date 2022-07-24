import { useSelector } from "react-redux";

const AuthenticatedStatus = () => {
  const auth_status = useSelector((state) => state.user.isAuthenticated);
  return auth_status;
}

export default AuthenticatedStatus
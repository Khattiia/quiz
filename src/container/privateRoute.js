import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    return <Navigate to={"/"} />;
  }

  return props.children;
};

export default PrivateRoute;

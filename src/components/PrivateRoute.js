import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, authedUser }) => {
  const location = useLocation();

  return authedUser ? (
    children
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...props }) => {
  return (
    props.isLoggedIn ? element : <Navigate to="/" />
  )
}

export default ProtectedRoute;
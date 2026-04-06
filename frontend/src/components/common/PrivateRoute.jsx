import { Outlet, Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

import React from 'react'

const PrivateRoute = ({allowedRoles}) => {

   const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // or "unauthorized" page
  }

  return <Outlet />;
}

export default PrivateRoute

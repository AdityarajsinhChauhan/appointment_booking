import { Outlet, Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

import React from 'react'

const PrivateRoute = () => {

   const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute

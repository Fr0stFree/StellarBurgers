import {Navigate} from "react-router-dom";
import React, {FC} from "react";

import {useAppLocation, useAppSelector} from "../hooks";

interface IProtectedRouteProps {
  allowFor: 'anonymous' | 'authenticated';
  children: any;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ allowFor, children }) => {
  const location = useAppLocation();
  const isAuthenticated = useAppSelector(state => !!state.auth.user);

  const from = location.state?.from || '/';

  if (allowFor === 'anonymous' && isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  if (allowFor === 'authenticated' && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;

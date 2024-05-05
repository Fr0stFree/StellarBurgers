import {Navigate} from "react-router-dom";
import React, {FC} from "react";

type ProtectedRouteProps = {
  redirectTo: string;
  predicate: () => boolean;
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({redirectTo, predicate, children}) => {
  if (!predicate()) {
    return <Navigate to={redirectTo} replace />
  }
  return children
}

export default ProtectedRoute;

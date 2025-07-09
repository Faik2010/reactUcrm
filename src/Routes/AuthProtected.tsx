import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isMainTokenValid, isAccessTokenValid } from "helpers/jwt-token-access/jwtHelper";

interface AuthProtectedProps {
  children: ReactNode;
}
  
const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  // Ana token ve access token'ların ikisinin de geçerli olduğunu kontrol et
  if (!isMainTokenValid() || !isAccessTokenValid()) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;

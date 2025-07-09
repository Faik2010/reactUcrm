import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/auth/login/thunk";
import { Navigate } from "react-router-dom";
import { getMainToken, getAccessToken } from "helpers/jwt-token-access/jwtHelper";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  // Token'ları kontrol et
  const mainToken = getMainToken();
  const accessToken = getAccessToken();

  // Logout işlemini başlat
  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(logoutUser() as any);
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    // Token varsa logout işlemi yap
    if (mainToken || accessToken) {
      performLogout();
    }
  }, [dispatch, mainToken, accessToken]);

  // Login sayfasına yönlendir
  return <Navigate to="/login" />;
};

export default Logout;

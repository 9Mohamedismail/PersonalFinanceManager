import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserInfoContext } from "../Context/UserInfoContext";

export default function ProtectedRoute() {
  const { user } = useContext(UserInfoContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

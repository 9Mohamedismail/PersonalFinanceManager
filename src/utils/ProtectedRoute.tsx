import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserInfoContext } from "../Context/UserInfoContext";

export default function ProtectedRoute() {
  const { authStatus } = useContext(UserInfoContext);

  if (authStatus === "loading") return null;

  return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
}

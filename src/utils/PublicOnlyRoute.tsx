import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserInfoContext } from "../Context/UserInfoContext";

export default function PublicOnlyRoute() {
  const { authStatus } = useContext(UserInfoContext);

  if (authStatus === "loading") {
    return null;
  }

  return authStatus === "authenticated" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
}

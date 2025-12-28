
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    return <Navigate to="/dev/login" replace />;
  }

  return children;
}

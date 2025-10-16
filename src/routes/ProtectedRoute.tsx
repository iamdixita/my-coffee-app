import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { ReactElement } from "react";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

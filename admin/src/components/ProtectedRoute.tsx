import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user, token, isAdmin } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/login" replace />;
  return <Outlet />;
}

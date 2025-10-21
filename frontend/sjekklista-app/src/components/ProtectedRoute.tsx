import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null; // or a spinner
  if (!user) {
    navigate("/login");
  }

  return children;
}

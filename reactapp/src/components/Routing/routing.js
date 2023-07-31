import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function useAuthenticationUser() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticatedUser");
    if (isAuthenticated === "false") {
      navigate("/");
    }
  }, []);
}
export function useAuthenticationAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticatedAdmin");
    if (isAuthenticated === "false") {
      navigate("/");
    }
  }, []);
}

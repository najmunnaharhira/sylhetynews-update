import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_jwt_token");
    if (storedToken) {
      setToken(storedToken);
      // Decode token to get user info (assume JWT)
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setUser({ id: payload.sub, email: payload.email, role: payload.role || "admin" });
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("admin_jwt_token", newToken);
    setToken(newToken);
    try {
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      setUser({ id: payload.sub, email: payload.email, role: payload.role || "admin" });
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_jwt_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

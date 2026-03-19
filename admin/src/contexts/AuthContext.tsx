import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, options?: { remember?: boolean; email?: string }) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_TOKEN_KEY = "admin_jwt_token";
const SESSION_TOKEN_KEY = "admin_jwt_token_session";
const LAST_EMAIL_KEY = "admin_last_email";

const decodeToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.sub || payload.email || "admin",
      email: payload.email || "admin@gmail.com",
      role: payload.role || "admin",
    };
  } catch {
    return null;
  }
};

const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(LOCAL_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
};

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(LOCAL_TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = getStoredToken();
    const decoded = storedToken ? decodeToken(storedToken) : null;

    if (storedToken && !decoded) {
      clearStoredAuth();
      return null;
    }

    return storedToken;
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = getStoredToken();
    return storedToken ? decodeToken(storedToken) : null;
  });

  useEffect(() => {
    if (token && !user) {
      clearStoredAuth();
      setToken(null);
    }
  }, [token, user]);

  const login = (newToken: string, options: { remember?: boolean; email?: string } = {}) => {
    const decodedUser = decodeToken(newToken);
    if (!decodedUser) {
      clearStoredAuth();
      setToken(null);
      setUser(null);
      return;
    }

    if (typeof window !== "undefined") {
      clearStoredAuth();
      if (options.remember === false) {
        sessionStorage.setItem(SESSION_TOKEN_KEY, newToken);
      } else {
        localStorage.setItem(LOCAL_TOKEN_KEY, newToken);
      }

      if (options.email?.trim()) {
        localStorage.setItem(LAST_EMAIL_KEY, options.email.trim());
      }
    }

    setToken(newToken);
    setUser(decodedUser);
  };

  const logout = () => {
    clearStoredAuth();
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

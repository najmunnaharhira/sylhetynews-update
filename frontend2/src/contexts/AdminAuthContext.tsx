import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getApiBaseUrl,
  isBackendConfigured,
  ADMIN_TOKEN_KEY,
  setAdminToken,
  clearAdminToken,
} from "../config/api";

type AdminUser = {
  email: string;
  role: "admin";
};

type AdminAuthContextValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  /** True when admin access is via backend API (VITE_API_URL set) */
  usingBackend: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined
);

function decodeTokenPayload(token: string): AdminUser | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const decoded = atob(padded);
    const data = JSON.parse(decoded) as { email?: string; role?: string };
    if (data.email && data.role === "admin") {
      return { email: data.email, role: "admin" };
    }
  } catch {
    return null;
  }
  return null;
}

export const AdminAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const usingBackend = isBackendConfigured();

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      const decodedUser = decodeTokenPayload(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        clearAdminToken();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, _remember: boolean) => {
    const base = getApiBaseUrl();
    let response: Response;
    try {
      response = await fetch(`${base}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch (error: unknown) {
      if (
        error instanceof TypeError ||
        (error instanceof Error && /failed to fetch/i.test(error.message))
      ) {
        throw new Error(
          "Cannot reach backend. Check VITE_API_URL and that the server is running."
        );
      }
      throw error;
    }

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload?.error || "Invalid email or password");
    }

    if (!payload?.token || !payload?.user) {
      throw new Error("Login response was incomplete");
    }

    setAdminToken(payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    clearAdminToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
      usingBackend,
    }),
    [user, loading, usingBackend]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

export { getApiBaseUrl };

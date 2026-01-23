import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AdminUser = {
  email: string;
  role: 'admin';
};

type AdminAuthContextValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'admin_jwt_token';

const getApiBaseUrl = () => {
  const envValue = import.meta.env.VITE_API_URL?.toString() ?? '';
  return envValue || 'http://localhost:5000';
};

const decodeTokenPayload = (token: string): AdminUser | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded = atob(padded);
    const data = JSON.parse(decoded) as { email?: string; role?: string };
    if (data.email && data.role === 'admin') {
      return { email: data.email, role: 'admin' };
    }
  } catch {
    return null;
  }
  return null;
};

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decodedUser = decodeTokenPayload(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, _remember: boolean) => {
    let response: Response;
    try {
      response = await fetch(`${getApiBaseUrl()}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (error: any) {
      if (error instanceof TypeError || /failed to fetch/i.test(String(error?.message))) {
        throw new Error('Failed to fetch. Check API URL and backend status.');
      }
      throw error;
    }

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload?.error || 'Invalid email or password');
    }

    if (!payload?.token || !payload?.user) {
      throw new Error('Login response was incomplete');
    }

    localStorage.setItem(TOKEN_KEY, payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const getApiBase = getApiBaseUrl;

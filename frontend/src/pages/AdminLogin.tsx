import { useState, useEffect, useRef } from "react";
import { useFormState } from "../components/ui/useFormState";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
// Firebase imports removed
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { api } from "../services/dataService";
import { getApiBaseUrl, isBackendConfigured } from "../config/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const adminApiAuth = useAdminAuth();
  const useApiAuth = true; // Always use backend authentication

  const { values, handleChange, setValues } = useFormState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const signInSuccessRef = useRef(false);

  const user = adminApiAuth.user;
  const isAdmin = adminApiAuth.isAuthenticated;
  const authLoading = adminApiAuth.loading;

  useEffect(() => {
    // Firebase logic removed
  }, [useApiAuth, firebaseAuth.user, firebaseAuth.isAdmin, firebaseAuth.loading, navigate]);

  useEffect(() => {
    if (adminApiAuth.isAuthenticated && !authLoading) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [adminApiAuth.isAuthenticated, authLoading, navigate]);

  // API mode: show form even without Firebase
  // Firebase config check removed

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!values.email.trim() || !values.password.trim()) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    signInSuccessRef.current = false;
    try {
      await adminApiAuth.login(values.email.trim(), values.password, values.rememberMe);
      navigate("/admin/dashboard", { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white shadow-lg border border-gray-100">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Sylhet News Admin Panel
            </h1>
            <p className="text-sm text-gray-500">Sign in to continue</p>
            {useApiAuth && (
              <p className="text-xs text-green-600 bg-green-50 rounded px-2 py-1 inline-block">
                Backend: {getApiBaseUrl()}
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
            aria-label="Admin login form"
            role="form"
          >
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="admin-email">
                Email
              </label>
              <Input
                id="admin-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                autoComplete="off"
                aria-required="true"
                aria-label="Admin email"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pr-10"
                  aria-required="true"
                  aria-label="Admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600" htmlFor="remember-me">
                <Checkbox
                  id="remember-me"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onCheckedChange={(checked) => setValues((prev) => ({ ...prev, rememberMe: Boolean(checked) }))}
                  aria-label="Remember me"
                />
                Remember me
              </label>
              {!useApiAuth && auth && (
                <button
                  type="button"
                  onClick={async () => {
                    if (!values.email.trim()) {
                      setError("Email is required to reset password");
                      return;
                    }
                    try {
                      setError("");
                      await sendPasswordResetEmail(auth, values.email.trim());
                    } catch (err: unknown) {
                      setError(err instanceof Error ? err.message : "Reset failed");
                    }
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

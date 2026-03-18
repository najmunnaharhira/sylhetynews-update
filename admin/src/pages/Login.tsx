
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { Toast } from "../components/Toast";
import { validateEmail, validateRequired } from "../utils/validation";

import { useAuth } from "../contexts/AuthContext";


  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validateRequired(password)) {
      setError("Password is required.");
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!data.token) throw new Error("Login failed.");
      login(data.token);
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err: any) {
      setError(err.message || "Login failed.");
      setToast({ message: err.message || "Login failed.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          {!logoError && (
            <img
              src="/sylhety-logo.jpeg"
              alt="Sylhety News"
              className="auth-logo"
              onError={() => setLogoError(true)}
            />
          )}
          <div className="auth-title-group">
            <h1 className="auth-title">Sylhety News Admin</h1>
            <p className="auth-subtitle">Sign in to manage news and content</p>
          </div>
        </div>

        {error && <div className="auth-alert error">{error}</div>}
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            autoComplete="username"
            error={error && !validateEmail(email) ? error : undefined}
          />
          <div className="auth-field">
            <label htmlFor="auth-password" className="auth-label">Password</label>
            <div className="auth-password-field">
              <Input
                id="auth-password"
                className="auth-input auth-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                error={error && validateEmail(email) && !validateRequired(password) ? error : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="auth-eye-button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="auth-actions">
            <span className="auth-hint">Use your admin email to sign in.</span>
          </div>
          <Button type="submit" loading={loading} className="auth-button primary" disabled={loading}>
            {loading ? <Spinner /> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

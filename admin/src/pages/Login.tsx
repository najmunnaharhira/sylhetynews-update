import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, checkBackendHealth } from "../lib/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Spinner } from "../components/Spinner";
import { Toast } from "../components/Toast";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail, validateRequired } from "../utils/validation";

const LAST_EMAIL_KEY = "admin_last_email";
const DEV_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_DEFAULT_EMAIL?.trim() || "";
const DEV_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_DEFAULT_PASSWORD || "";

export default function Login() {
  const navigate = useNavigate();
  const { login, token, isAdmin } = useAuth();
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") {
      return DEV_ADMIN_EMAIL;
    }

    return localStorage.getItem(LAST_EMAIL_KEY)?.trim() || DEV_ADMIN_EMAIL;
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [savedEmail, setSavedEmail] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return localStorage.getItem(LAST_EMAIL_KEY)?.trim() || "";
  });
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");
  const [backendMessage, setBackendMessage] = useState("Checking backend connection...");

  useEffect(() => {
    if (token && isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAdmin, navigate, token]);

  useEffect(() => {
    let isMounted = true;

    const verifyBackend = async () => {
      const status = await checkBackendHealth();
      if (!isMounted) {
        return;
      }

      setBackendStatus(status.online ? "online" : "offline");
      setBackendMessage(status.message);
    };

    void verifyBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  const quickActionLabel = useMemo(() => {
    if (DEV_ADMIN_EMAIL && DEV_ADMIN_PASSWORD) {
      return "Fill Dev Login";
    }

    if (DEV_ADMIN_EMAIL) {
      return "Use Default Email";
    }

    if (savedEmail) {
      return "Use Last Email";
    }

    return "";
  }, [savedEmail]);

  const handleQuickFill = () => {
    if (DEV_ADMIN_EMAIL) {
      setEmail(DEV_ADMIN_EMAIL);
    } else if (savedEmail) {
      setEmail(savedEmail);
    }

    if (DEV_ADMIN_PASSWORD) {
      setPassword(DEV_ADMIN_PASSWORD);
      setShowPassword(true);
    }
  };

  const normalizeLoginError = (message: string) => {
    if (message === "Invalid credentials") {
      return "Incorrect admin email or password.";
    }

    if (message.includes("Cannot reach backend API")) {
      return "Backend is offline. Start the backend server, then try signing in again.";
    }

    return message;
  };

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
      const data = await apiFetch<{ token: string }>("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!data.token) {
        throw new Error("Login failed.");
      }

      login(data.token, { remember: rememberMe, email: email.trim() });
      setSavedEmail(email.trim());
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 400);
    } catch (err: unknown) {
      const message = normalizeLoginError(err instanceof Error ? err.message : "Login failed.");
      setError(message);
      setToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <aside className="auth-panel auth-panel-brand">
          <span className="auth-badge">Admin Workspace</span>
          <h1 className="auth-panel-title">Publish faster, manage smarter.</h1>
          <p className="auth-panel-copy">
            Control news, categories, team members, and photocard templates from one clean workspace.
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <strong>News Desk</strong>
              <span>Create headlines, manage sections, and keep the homepage current.</span>
            </div>
            <div className="auth-feature-item">
              <strong>Photocard Control</strong>
              <span>Upload default templates that visitors can download directly from the public site.</span>
            </div>
            <div className="auth-feature-item">
              <strong>Local Dev Hint</strong>
              <span>Keep the backend running on `http://127.0.0.1:5000` while using the admin locally.</span>
            </div>
          </div>
        </aside>

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
              <span className="auth-kicker">Secure Login</span>
              <h2 className="auth-title">Sylhety News Admin</h2>
              <p className="auth-subtitle">Sign in to manage news and content</p>
            </div>
          </div>

          <div className="auth-status-row">
            <span className={`auth-status ${backendStatus}`}>
              {backendStatus === "checking"
                ? "Checking backend"
                : backendStatus === "online"
                  ? "Backend online"
                  : "Backend offline"}
            </span>
            <button
              type="button"
              className="auth-inline-button"
              onClick={() => {
                setBackendStatus("checking");
                setBackendMessage("Checking backend connection...");
                void checkBackendHealth().then((status) => {
                  setBackendStatus(status.online ? "online" : "offline");
                  setBackendMessage(status.message);
                });
              }}
            >
              Refresh Status
            </button>
          </div>

          <p className="auth-meta-note">{backendMessage}</p>

          {quickActionLabel ? (
            <div className="auth-quick-actions">
              <button type="button" className="auth-quick-action" onClick={handleQuickFill}>
                {quickActionLabel}
              </button>
              {savedEmail && savedEmail !== email ? (
                <button
                  type="button"
                  className="auth-quick-action"
                  onClick={() => setEmail(savedEmail)}
                >
                  Use {savedEmail}
                </button>
              ) : null}
            </div>
          ) : null}

          {error && <div className="auth-alert error">{error}</div>}
          {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email"
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
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
                  placeholder="Enter your password"
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
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Keep me signed in on this device</span>
              </label>
              <span className="auth-hint">
                {savedEmail ? `Last email: ${savedEmail}` : "Email will be remembered after login."}
              </span>
            </div>

            <p className="auth-meta-note">
              Use the admin credentials configured in `backend/.env`. For local development, the backend should run at `http://127.0.0.1:5000`.
            </p>

            <Button type="submit" loading={loading} className="auth-button primary" disabled={loading}>
              {loading ? <Spinner /> : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

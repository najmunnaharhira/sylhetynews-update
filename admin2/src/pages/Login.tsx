import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebaseReady } from "@/lib/firebase";

const getAllowedEmails = () => {
  const value = import.meta.env.VITE_ADMIN_EMAILS || "admin@gmail.com";
  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!auth) {
      setError("Firebase is not configured. Add .env with VITE_FIREBASE_* keys.");
      return;
    }
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const allowed = getAllowedEmails();
      const userEmail = credential.user.email?.toLowerCase() || "";
      if (!allowed.includes(userEmail)) {
        await signOut(auth);
        setError("This email is not authorized as admin.");
        return;
      }

      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setNotice("");
    if (!auth) {
      setError("Firebase is not configured.");
      return;
    }
    if (!email.trim()) {
      setError("Enter your email first to reset the password.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setNotice("Password reset email sent. Check your inbox.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    setNotice("");
    if (!auth) {
      setError("Firebase is not configured.");
      return;
    }
    if (!email.trim() || !password) {
      setError("Enter email and password to create an account.");
      return;
    }
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const allowed = getAllowedEmails();
      const userEmail = credential.user.email?.toLowerCase() || "";
      if (!allowed.includes(userEmail)) {
        await signOut(auth);
        setError("This email is not authorized as admin.");
        return;
      }

      setNotice("Account created. You can sign in now.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Account creation failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!firebaseReady) {
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
              <p className="auth-subtitle">Firebase not configured</p>
            </div>
          </div>
          <div className="auth-alert error">
            Add a <code>.env</code> file with VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID, and other Firebase keys.
          </div>
        </div>
      </div>
    );
  }

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
            <p className="auth-subtitle">
              Sign in to manage news and content
            </p>
          </div>
        </div>

        {error && <div className="auth-alert error">{error}</div>}
        {notice && <div className="auth-alert success">{notice}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="auth-email" className="auth-label">Email</label>
            <input
              id="auth-email"
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              aria-label="Email"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="auth-password" className="auth-label">Password</label>
            <div className="auth-password-field">
              <input
                id="auth-password"
                className="auth-input auth-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                aria-label="Password"
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
            <button
              type="button"
              onClick={handleForgotPassword}
              className="auth-link"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="auth-button primary"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button
            type="button"
            onClick={handleCreateAccount}
            disabled={loading}
            className="auth-button secondary"
          >
            Create admin account
          </button>
        </form>
      </div>
    </div>
  );
}

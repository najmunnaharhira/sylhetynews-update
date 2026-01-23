"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const getAllowedEmails = () => {
  const value = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@gmail.com";
  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

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

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setNotice("");
    if (!email.trim()) {
      setError("Enter your email first to reset the password.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setNotice("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    setNotice("");
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
    } catch (err: any) {
      setError(err?.message || "Account creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img
            src="/sylhety-logo.jpeg"
            alt="Sylhety News"
            className="auth-logo"
          />
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
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-password-field">
              <input
                className="auth-input auth-password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
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

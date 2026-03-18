import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      setAdminToken(data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #e2e8f099' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center', color: '#2d3748' }}>Sylhety News Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: 12, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 16 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: 12, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 16 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 6, background: '#3182ce', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', marginTop: 8 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "#e53e3e", marginTop: 8, textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;


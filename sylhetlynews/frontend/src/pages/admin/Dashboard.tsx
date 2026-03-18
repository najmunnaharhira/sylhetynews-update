import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminToken, clearAdminToken } from "../../config/api";

const Dashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAdminToken();
        if (!token) {
          navigate("/admin/login");
          return;
        }
        // Fetch user info
        const resUser = await fetch("http://localhost:5000/api/admin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resUser.ok) throw new Error("Failed to fetch user info");
        const userData = await resUser.json();
        setUser(userData);
        // Fetch analytics
        const resAnalytics = await fetch("http://localhost:5000/api/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resAnalytics.ok) throw new Error("Failed to fetch analytics");
        setAnalytics(await resAnalytics.json());
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    clearAdminToken();
    setUser(null);
    navigate("/admin/login");
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Sylhety News Admin</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {user ? (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 18 }}>Welcome to Sylhety News, {user.name}!</p>
          <p style={{ color: '#666' }}>{user.email}</p>
          <button onClick={handleLogout} style={{ marginTop: 8, padding: '8px 16px', borderRadius: 4, background: '#e53e3e', color: '#fff', border: 'none', fontWeight: 600 }}>Logout</button>
        </div>
      ) : (
        <div>Loading user info...</div>
      )}

      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <a href="/admin/news" style={navBtnStyle}>News Manager</a>
        <a href="/admin/categories" style={navBtnStyle}>Category Manager</a>
        <a href="/admin/team" style={navBtnStyle}>Team Manager</a>
        <a href="/admin/photocards" style={navBtnStyle}>Photocard Manager</a>
        <a href="/admin/settings" style={navBtnStyle}>Business Settings</a>
      </nav>

      {analytics && (
        <div style={{ marginTop: 24 }}>
          <h2>Site Analytics</h2>
          <pre>{JSON.stringify(analytics, null, 2)}</pre>
        </div>
      )}
    </div>
  );

}

const navBtnStyle = {
  display: 'inline-block',
  padding: '14px 28px',
  background: '#f7fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 18,
  color: '#2d3748',
  textDecoration: 'none',
  boxShadow: '0 2px 8px #e2e8f033',
  transition: 'background 0.2s',
};

export default Dashboard;


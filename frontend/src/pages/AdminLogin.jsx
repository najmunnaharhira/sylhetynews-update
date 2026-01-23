import { useState } from "react";
import { adminLogin } from "../services/authService";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Signing in...");
    try {
      const data = await adminLogin(form);
      localStorage.setItem("accessToken", data.token);
      setStatus("Admin login successful.");
    } catch (error) {
      setStatus(error?.response?.data?.message || "Admin login failed.");
    }
  };

  return (
    <section className="container grid two">
      <div className="card">
        <h2>Admin Login</h2>
        <p>Access the admin dashboard securely.</p>
      </div>
      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
        </label>
        <button className="btn secondary" type="submit">
          Login as Admin
        </button>
        {status && <small>{status}</small>}
      </form>
    </section>
  );
};

export default AdminLogin;

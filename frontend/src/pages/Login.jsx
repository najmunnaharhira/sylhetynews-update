import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Signing in...");
    try {
      const data = await login(form);
      localStorage.setItem("accessToken", data.token);
      setStatus("Signed in successfully.");
    } catch (error) {
      setStatus(error?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <section className="container grid two">
      <div className="card">
        <h2>User Login</h2>
        <p>Sign in to access your account.</p>
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
        <button className="btn" type="submit">
          Login
        </button>
        {status && <small>{status}</small>}
      </form>
    </section>
  );
};

export default Login;

import { useState } from "react";
import { register } from "../services/authService";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Creating account...");
    try {
      await register(form);
      setStatus("Account created. You can log in now.");
    } catch (error) {
      setStatus(error?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <section className="container grid two">
      <div className="card">
        <h2>Create an account</h2>
        <p>Register to access user features.</p>
      </div>
      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input name="name" type="text" onChange={handleChange} required />
        </label>
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
          Register
        </button>
        {status && <small>{status}</small>}
      </form>
    </section>
  );
};

export default Register;

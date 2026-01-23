import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav>
          <span className="brand">Sylhetly Starter</span>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/admin/login">Admin</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

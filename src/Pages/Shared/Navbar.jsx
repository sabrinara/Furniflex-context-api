// src/components/NavBar.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Store</Link>
      <Link to="/cart">Cart</Link>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;

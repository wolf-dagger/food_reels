import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ accountType }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <nav className="top-nav" aria-label="Account navigation">
      <Link className="brand brand-dark" to="/user/login">
        <span className="brand-mark">f</span>
        <span>foodreels</span>
      </Link>
      <div className="nav-actions">
        <Link
          className={`nav-link ${accountType === "user" ? "is-active" : ""}`}
          to="/user/login"
        >
          User
        </Link>
        <Link
          className={`nav-link ${accountType === "foodpartner" ? "is-active" : ""}`}
          to="/foodpartner/login"
        >
          Food partner
        </Link>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

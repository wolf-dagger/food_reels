import { Bookmark, Home, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNav = () => (
  <nav className="bottom-nav" aria-label="Main navigation">
    <NavLink className="bottom-nav-link" to="/" end>
      <Home size={22} strokeWidth={1.8} />
      <span>Home</span>
    </NavLink>
    <NavLink className="bottom-nav-link" to="/profile">
      <UserRound size={22} strokeWidth={1.8} />
      <span>Profile</span>
    </NavLink>
    <NavLink className="bottom-nav-link" to="/saved">
      <Bookmark size={22} strokeWidth={1.8} />
      <span>Saved</span>
    </NavLink>
  </nav>
);

export default BottomNav;

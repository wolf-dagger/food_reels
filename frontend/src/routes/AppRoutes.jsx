import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodPartnerLogin from "../components/FoodPartnerLogin";
import FoodPartnerRegister from "../components/FoodPartnerRegister";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import Home from "../pages/general/Home";
import CreateFood from "../pages/FoodPartner/CreateFood";
import Profile from "../pages/FoodPartner/Profile";
import UserProfile from "../pages/general/UserProfile";
import Saved from "../pages/general/Saved";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/foodpartner/register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
          <Route path="/foodpartner/:id" element={<Profile />} />
          <Route path="/stores/:id" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-food" element={<CreateFood />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodPartnerLogin from "../components/FoodPartnerLogin";
import FoodPartnerRegister from "../components/FoodPartnerRegister";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";

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
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;

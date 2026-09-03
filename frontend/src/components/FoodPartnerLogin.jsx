import { useState } from "react";
import AuthLayout, { AuthHeading, AuthSwitch } from "./AuthLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FoodPartnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const response = await axios
      .post(
        "http://localhost:3000/api/auth/foodpartner/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        navigate("/create-food");
      })
      .catch((err) => {
        console.error("There was an error while loginning in", err);
      });
  }

  return (
    <AuthLayout accountType="foodpartner">
      <AuthHeading />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email address
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="form-meta">
          <label className="checkbox-label">
            <input type="checkbox" name="remember" />
            <span>Remember me</span>
          </label>
          <a href="#forgot-password">Forgot password?</a>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <AuthSwitch accountType="foodpartner" />
    </AuthLayout>
  );
}

export default FoodPartnerLogin;

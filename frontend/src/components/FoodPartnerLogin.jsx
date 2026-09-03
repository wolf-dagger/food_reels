import AuthLayout, { AuthHeading, AuthSwitch } from "./AuthLayout";

function FoodPartnerLogin() {
  return (
    <AuthLayout accountType="foodpartner">
      <AuthHeading />
      <form className="auth-form">
        <label>
          Email address
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
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

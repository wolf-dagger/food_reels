import AuthLayout, { AuthHeading, AuthSwitch } from "./AuthLayout";

function FoodPartnerRegister() {
  return (
    <AuthLayout accountType="foodpartner">
      <AuthHeading isRegister />
      <form className="auth-form">
        <label>
          Business name
          <input
            type="text"
            name="businessName"
            placeholder="Your business name"
          />
        </label>
        <label>
          Contact name
          <input
            type="text"
            name="contactName"
            placeholder="Your business name"
          />
        </label>
        <label>
          Phone
          <input type="text" name="phone" placeholder="+1 (123) 456-7890" />
        </label>
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
        <label>
          Address
          <input
            type="text"
            name="address"
            placeholder="Your business address"
          />
        </label>
        <button type="submit">Create account</button>
      </form>
      <AuthSwitch accountType="foodpartner" isRegister />
    </AuthLayout>
  );
}

export default FoodPartnerRegister;

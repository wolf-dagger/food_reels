import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const accountConfig = {
  user: {
    label: "Food lover",
    title: "Your next favorite bite is closer than you think.",
    description:
      "Save the reels that make you hungry and discover places worth sharing.",
    registerPath: "/user/register",
    loginPath: "/user/login",
  },
  foodpartner: {
    label: "Food partner",
    title: "Put your signature dishes in the spotlight.",
    description:
      "Share your story, showcase your menu, and meet your next regular.",
    registerPath: "/foodpartner/register",
    loginPath: "/foodpartner/login",
  },
};

function AuthLayout({ accountType, children }) {
  const account = accountConfig[accountType];

  return (
    <>
      <Navbar accountType={accountType} />
      <main className="auth-shell">
        <section className="auth-intro" aria-label="FoodReels introduction">
          <div className="intro-copy">
            <p className="eyebrow">{account.label}</p>
            <h1>{account.title}</h1>
            <p>{account.description}</p>
          </div>

          <div className="intro-foot">
            <span className="pulse-dot" aria-hidden="true" />
            <span>Good food. Great stories.</span>
          </div>
        </section>
        <section className="auth-panel">
          <div className="auth-card">{children}</div>
        </section>
      </main>
    </>
  );
}

export function AuthHeading({ isRegister }) {
  return (
    <div className="auth-heading">
      <p className="eyebrow">
        {isRegister ? "Create your account" : "Welcome back"}
      </p>
      <h2>
        {isRegister ? "Start your FoodReels journey" : "Sign in to FoodReels"}
      </h2>
      <p>
        {isRegister
          ? "A world of good food is waiting for you."
          : "Pick up right where you left off."}
      </p>
    </div>
  );
}

export function AuthSwitch({ accountType, isRegister }) {
  const account = accountConfig[accountType];

  return (
    <>
      <p className="auth-switch">
        {isRegister ? "Already have an account?" : "New to FoodReels?"}{" "}
        <Link to={isRegister ? account.loginPath : account.registerPath}>
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
      <div className="partner-switch">
        <span>
          {accountType === "user"
            ? "Are you a food business?"
            : "Looking for food inspiration?"}
        </span>
        <Link
          to={accountType === "user" ? "/foodpartner/login" : "/user/login"}
        >
          {accountType === "user"
            ? "Join as a partner"
            : "Join as a food lover"}
        </Link>
      </div>
    </>
  );
}

export default AuthLayout;

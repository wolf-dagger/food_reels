import { useState } from "react";
import AuthLayout, { AuthHeading, AuthSwitch } from "./AuthLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const response = await axios
      .post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log("There was an error while registering", err);
      });
  }

  return (
    <AuthLayout accountType="user">
      <AuthHeading isRegister />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
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
        <button type="submit">Create account</button>
      </form>
      <AuthSwitch accountType="user" isRegister />
    </AuthLayout>
  );
}

export default UserRegister;

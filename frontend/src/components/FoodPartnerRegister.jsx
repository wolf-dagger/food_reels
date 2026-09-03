import { useState } from "react";
import AuthLayout, { AuthHeading, AuthSwitch } from "./AuthLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FoodPartnerRegister() {
  const [formData, setFormData] = useState({
    buisnessName: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodpartner/register",
      {
        buisnessName: formData.buisnessName,
        contactName: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        password: formData.password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(response.data);

    navigate("/create-food");
  }

  return (
    <AuthLayout accountType="foodpartner">
      <AuthHeading isRegister />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Business name
          <input
            type="text"
            name="buisnessName"
            placeholder="Your business name"
            value={formData.buisnessName}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact name
          <input
            type="text"
            name="contactName"
            placeholder="Your business name"
            value={formData.contactName}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            placeholder="+1 (123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            placeholder="Your business address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create account</button>
      </form>
      <AuthSwitch accountType="foodpartner" isRegister />
    </AuthLayout>
  );
}

export default FoodPartnerRegister;

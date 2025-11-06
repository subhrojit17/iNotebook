import React, { useState, useEffect } from "react";
import { ReactComponent as MobileWireframe } from "../assets/Sign up-rafiki.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const host = process.env.REACT_APP_LOCAL_HOST;
 let navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const passwordsMatch =
    formData.password && formData.password === formData.confirmPassword;
  const passValid =
    formData.password.length >= 8 && formData.confirmPassword.length >= 8;

  useEffect(() => {
    const nameValid = formData.name.trim().length > 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    setIsValid(nameValid && emailValid);
  }, [formData]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert("Entered passwords don't match!");
    }
    if (!passValid) {
      alert("Password must be atleast 8 characters.");
    } else {
      try {
        const response = await axios.post(
          `${host}/api/auth/createUser`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          localStorage.setItem("token", response.data.authToken);
          navigate("/login");
          alert("Registered successfully!");
        } else {
        }
      } catch (error) {}
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {/* Left: Registration form box */}
      <div className="container w-50 border border-2 rounded-2 p-4 shadow-sm bg-tertiary">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Create your Account</h3>

          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!isValid}
          >
            Register
          </button>
        </form>
      </div>

      {/* Right: Illustration section */}
      <div className="w-50 d-flex justify-content-center align-items-center">
        <MobileWireframe style={{ maxWidth: "90%", height: "auto" }} />
      </div>
    </div>
  );
};

export default Signup;

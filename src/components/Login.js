import React, { useState } from "react";

import { ReactComponent as MobileWireframe } from "../assets/Mobile wireframe-cuate.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const host = process.env.REACT_APP_LOCAL_HOST;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${host}/api/auth/login`,
        { email: credentials.email, password: credentials.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.authToken);
        navigate('/home')
      } else {
      }
    } catch (error) {

    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container w-50 border border-2 rounded-2 p-4 shadow-sm bg-tertiary">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Login to see your Notes</h3>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>

      <div className="w-50 d-flex justify-content-center align-items-center">
        <MobileWireframe style={{ maxWidth: "80%", height: "auto" }} />
      </div>
    </div>
  );
};

export default Login;

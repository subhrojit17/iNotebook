import React from "react";

import { ReactComponent as MobileWireframe } from "../assets/Mobile wireframe-cuate.svg";
const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container w-50 border border-2 rounded-2 p-4 shadow-sm bg-tertiary">
        <form className="">
          <h3 className="mb-4 text-center">Login to see your Notes</h3>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
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

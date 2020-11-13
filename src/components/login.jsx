import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({
    empCode: "",
    password: "",
  });

  const history = useHistory();

  function handleChange(e) {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      `Employee code: ${loginDetails["empCode"]}, Password: ${loginDetails["password"]}`
    );
    localStorage.setItem("ONLINE_EXAM_SESSION", { empCode: loginDetails['empCode'] });
    localStorage.setItem("empCode", loginDetails.empCode);
    localStorage.setItem("password", loginDetails.password);
    history.replace("/exam-info");
  }

  return (
    <div className="section">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="input-emp-code" className="login-label">Employee code</label>
          <input
            className="login-input"
            value={loginDetails.empCode}
            type="text"
            id="input-emp-code"
            name="empCode"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="input-password" className="login-label">Password</label>
          <input
            className="login-input"
            value={loginDetails.password}
            type="password"
            id="input-password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <button type="button" className="login-submit-btn" onClick={handleSubmit}>Submit </button>
      </form>
    </div>
  );
};

export default Login;

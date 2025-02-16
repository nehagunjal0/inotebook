import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    // API call
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const user = await response.json();
    console.log(user);

    if (user.success) {
      // Save token & redirect
      localStorage.setItem("token", user.jwtData);
      props.showAlert("LoggedIn successfully", "success");
      localStorage.setItem("emailid", credentials.email);
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
      setCredentials({ email: "", password: "" });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-sm"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

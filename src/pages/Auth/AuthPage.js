import React, { useState } from "react";
import axios from "../../api/axios"; // Adjust the path as necessary
import "./AuthPage.css";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // const res = await axios.post("http://localhost:8000/api/login/", loginData);
  //     const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, loginData);
  //     localStorage.setItem("token", res.data.access);
  //     alert("Login successful!");
  //     window.location.href = "/home"; // redirect after login
  //   } catch (error) {
  //     alert("Login failed!");
  //     console.error(error);
  //   }
  // };
    const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("login/", loginData); // ✅ no /api/ prefix needed
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      alert("Login successful!");
      window.location.href = "/#home";
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

  //   try {
  //     // await axios.post("http://localhost:8000/api/signup/", {
  //     await axios.post(`${process.env.REACT_APP_API_URL}/api/signup/`, {
  //       username: signupData.username,
  //       email: signupData.email,
  //       password: signupData.password,
  //     });
  //     alert("Signup successful! You can now log in.");
  //     setIsLogin(true);
  //   } catch (error) {
  //     alert("Signup failed!");
  //     console.error(error);
  //   }
  // };
    try {
      await axios.post("signup/", {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
      });
      alert("Signup successful! You can now log in.");
      setIsLogin(true);
    } catch (error) {
      alert("Signup failed!");
      console.error(error);
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-title">Login Form</div>
      <div className="form-container">
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form className="form" onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <div className="pass-link">
              <button type="button" className="link-button">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="submit-btn">Login</button>
            <div className="signup-link">
              Not a member?
              <button
                type="button"
                className="link-button"
                onClick={() => setIsLogin(false)}
              >
                Signup now
              </button>
            </div>
          </form>
        ) : (
          <form className="form" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            <button type="submit" className="submit-btn">Signup</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthPage;



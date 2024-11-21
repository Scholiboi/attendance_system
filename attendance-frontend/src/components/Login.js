import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the new CSS file

const Login = ({ setUserRole, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Attendance System";
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setUserRole(response.data.role);
      setUserId(response.data.user_id);

      // Store user information in local storage
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userId", response.data.user_id);

      // Navigate based on role
      if (response.data.role === "student") {
        navigate("/student-dashboard");
      } else if (response.data.role === "teacher") {
        navigate("/teacher-dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Attendance System Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

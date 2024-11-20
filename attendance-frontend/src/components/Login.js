import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserRole, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-xl mb-4 font-bold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

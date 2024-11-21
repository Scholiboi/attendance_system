import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const AdminLogin = ({ setUserRole, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Login - Attendance System';
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        username,
        password,
      });
      setUserRole(response.data.role);
      setUserId(response.data.user_id);
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('userId', response.data.user_id);
      navigate('/admin-dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

export default AdminLogin;
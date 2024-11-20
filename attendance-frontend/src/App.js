import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

    if (storedUserRole && storedUserId) {
      setUserRole(storedUserRole);
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setUserRole={setUserRole} setUserId={setUserId} />}
        />
        <Route
          path="/student-dashboard"
          element={userRole === "student" ? <StudentDashboard userId={userId} /> : <Navigate to="/" />}
        />
        <Route
          path="/teacher-dashboard"
          element={userRole === "teacher" ? <TeacherDashboard userId={userId} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = ({ userId }) => {
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student's classes
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/student/${userId}/classes`
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [userId]);

  const fetchAttendance = async (classId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/${userId}/attendance/${classId}`
      );
      // Sort the attendance by date
      const sortedAttendance = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setAttendance(sortedAttendance);
      setSelectedClass(classId);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleClassClick = (classId) => {
    if (classId === selectedClass) {
      // If the same class is clicked, toggle selection off
      setSelectedClass(null);
      setAttendance([]);
    } else {
      fetchAttendance(classId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Student Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <h2 className="dashboard-subheader">Your Classes:</h2>
      <ul className="classes-list">
        {classes.length === 0 ? (
          <li>No classes found</li>
        ) : (
          classes.map((cls) => (
            <li
              key={cls.class_id}
              className={`class-item ${
                selectedClass === cls.class_id ? "selected" : ""
              }`}
              onClick={() => handleClassClick(cls.class_id)}
            >
              {cls.class_name}
            </li>
          ))
        )}
      </ul>

      {selectedClass && (
        <>
          <h2 className="dashboard-subheader">
            Attendance for Class:{" "}
            {classes.find((c) => c.class_id === selectedClass)?.class_name}
          </h2>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan="2">No attendance data available</td>
                </tr>
              ) : (
                attendance.map((att, index) => (
                  <tr key={index}>
                    <td>{new Date(att.date).toLocaleDateString()}</td>
                    <td>{att.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
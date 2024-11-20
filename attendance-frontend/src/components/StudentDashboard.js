import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = ({ userId }) => {
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student's classes
    axios.get(`http://localhost:5000/student/${userId}/classes`).then((response) => {
      setClasses(response.data);
    });
  }, [userId]);

  const fetchAttendance = (classId) => {
    axios
      .get(`http://localhost:5000/student/${userId}/attendance/${classId}`)
      .then((response) => {
        setAttendance(response.data);
        setSelectedClass(classId);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mb-4">
        Logout
      </button>

      <h2 className="text-xl font-semibold mb-2">Your Classes:</h2>
      <ul className="mb-4">
        {classes.map((cls) => (
          <li
            key={cls.class_id}
            className="cursor-pointer text-blue-500"
            onClick={() => fetchAttendance(cls.class_id)}
          >
            {cls.class_name}
          </li>
        ))}
      </ul>

      {selectedClass && (
        <>
          <h2 className="text-xl font-semibold mb-2">Attendance for Class {selectedClass}:</h2>
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Date</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{att.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
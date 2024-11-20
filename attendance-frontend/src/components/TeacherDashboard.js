import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = ({ userId }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teacher's classes
    axios.get(`http://localhost:5000/teacher/${userId}/classes`).then((response) => {
      setClasses(response.data);
    });
  }, [userId]);

  const fetchStudents = (classId) => {
    axios.get(`http://localhost:5000/teacher/${userId}/students/${classId}`).then((response) => {
      setStudents(response.data);
      setSelectedClass(classId);

      // Initialize attendance object
      const initialAttendance = {};
      response.data.forEach((student) => {
        initialAttendance[student.student_id] = "Present"; // Default status
      });
      setAttendance(initialAttendance);
    });
  };

  const fetchAttendance = (classId) => {
    axios.get(`http://localhost:5000/teacher/${userId}/attendance/${classId}`).then((response) => {
      setAttendance(response.data);
      setSelectedClass(classId);
    });
  };

  const markAttendance = () => {
    axios.post(`http://localhost:5000/teacher/${userId}/attendance/${selectedClass}`, {
      date,
      attendance: Object.entries(attendance).map(([student_id, status]) => ({
        student_id,
        status,
      })),
    })
    .then(() => {
      alert("Attendance marked successfully!");
    })
    .catch((error) => {
      console.error("There was an error marking the attendance!", error);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mb-4">
        Logout
      </button>

      <h2 className="text-xl font-semibold mb-2">Your Classes:</h2>
      <ul className="mb-4">
        {classes.map((cls) => (
          <li
            key={cls.class_id}
            className="cursor-pointer text-blue-500"
            onClick={() => fetchStudents(cls.class_id)}
          >
            {cls.class_name}
          </li>
        ))}
      </ul>

      {selectedClass && (
        <>
          <h2 className="text-xl font-semibold mb-2">Mark Attendance for Class {selectedClass}:</h2>
          <input
            type="date"
            className="border p-2 mb-4 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {students.map((student) => (
            <div key={student.student_id} className="flex items-center mb-2">
              <span className="w-1/2">{student.student_name}</span>
              <select
                className="border p-2"
                value={attendance[student.student_id]}
                onChange={(e) =>
                  setAttendance({
                    ...attendance,
                    [student.student_id]: e.target.value,
                  })
                }
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
          ))}
          <button
            onClick={markAttendance}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
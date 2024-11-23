import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

const TeacherDashboard = ({ userId }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/teacher/${userId}/classes`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (selectedClass) {
      axios
        .get(`http://localhost:5000/teacher/${userId}/students/${selectedClass}`)
        .then((response) => {
          setStudents(response.data);
          const initialAttendance = {};
          response.data.forEach((student) => {
            initialAttendance[student.student_id] = null;
          });
          setAttendance(initialAttendance);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }
  }, [selectedClass, userId]);

  useEffect(() => {
    if (selectedClass && date) {
      axios
        .get(
          `http://localhost:5000/teacher/${userId}/attendance/${selectedClass}/${date}`
        )
        .then((response) => {
          const attendanceMap = {};
          response.data.forEach((record) => {
            attendanceMap[record.student_id] = record.status;
          });

          setAttendance((prevAttendance) => {
            const updatedAttendance = { ...prevAttendance };
            students.forEach((student) => {
              updatedAttendance[student.student_id] =
                attendanceMap[student.student_id] || null;
            });
            return updatedAttendance;
          });
        })
        .catch((error) => {
          console.error("Error fetching attendance:", error);
        });
    }
  }, [selectedClass, date, students, userId]);

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    setDate(""); 
    setAttendance({});
  };

  const markAttendance = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    axios
      .post(
        `http://localhost:5000/teacher/${userId}/attendance/${selectedClass}`,
        {
          date,
          attendance: Object.entries(attendance).map(
            ([student_id, status]) => ({
              student_id,
              status,
            })
          ),
        }
      )
      .then(() => {
        alert("Attendance marked successfully!");
      })
      .catch((error) => {
        console.error("Error marking attendance:", error);
      });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Teacher Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <h2 className="dashboard-subheader">Your Classes:</h2>
      <ul className="classes-list">
        {classes.map((cls) => (
          <li
            key={cls.class_id}
            className={`class-item ${
              selectedClass === cls.class_id ? "selected" : ""
            }`}
            onClick={() => handleClassSelect(cls.class_id)}
          >
            {cls.class_name}
          </li>
        ))}
      </ul>

      {selectedClass && (
        <>
          <h2 className="dashboard-subheader">
            Class: {classes.find((c) => c.class_id === selectedClass)?.class_name}
          </h2>
          <div className="date-container">
            <label htmlFor="date-input">Select Date:</label>
            <input
              id="date-input"
              type="date"
              className="date-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {date && students.length > 0 && (
            <>
              <div className="attendance-list">
                {students.map((student) => (
                  <div key={student.student_id} className="student-row">
                    <span>{student.student_name}</span>
                    <div className="attendance-options">
                      <label>
                        <input
                          type="radio"
                          name={`attendance-${student.student_id}`}
                          value="Present"
                          checked={attendance[student.student_id] === "Present"}
                          onChange={() =>
                            setAttendance((prevAttendance) => ({
                              ...prevAttendance,
                              [student.student_id]: "Present",
                            }))
                          }
                        />
                        Present
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`attendance-${student.student_id}`}
                          value="Late"
                          checked={attendance[student.student_id] === "Late"}
                          onChange={() =>
                            setAttendance((prevAttendance) => ({
                              ...prevAttendance,
                              [student.student_id]: "Late",
                            }))
                          }
                        />
                        Late
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`attendance-${student.student_id}`}
                          value="Absent"
                          checked={attendance[student.student_id] === "Absent"}
                          onChange={() =>
                            setAttendance((prevAttendance) => ({
                              ...prevAttendance,
                              [student.student_id]: "Absent",
                            }))
                          }
                        />
                        Absent
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={markAttendance} className="submit-button">
                Submit Attendance
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
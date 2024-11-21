import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [teacherData, setTeacherData] = useState({ name: '', email: '', password: '' });
  const [studentData, setStudentData] = useState({ name: '', email: '', password: '' });
  const [classData, setClassData] = useState({ name: '', teacher_id: '' });
  const [enrollmentData, setEnrollmentData] = useState({ student_id: '', class_id: '' });
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Dashboard - Attendance System';
    fetchTeachers();
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/admin-login');
  };

  const handleAddTeacher = async () => {
    try {
      await axios.post('http://localhost:5000/admin/add_teacher', teacherData);
      alert('Teacher added successfully');
      setTeacherData({ name: '', email: '', password: '' });
      fetchTeachers(); // Refresh the list of teachers
    } catch (error) {
      alert(error.response.data.error || 'Error adding teacher');
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:5000/admin/add_student', studentData);
      alert('Student added successfully');
      setStudentData({ name: '', email: '', password: '' });
      fetchStudents(); // Refresh the list of students
    } catch (error) {
      alert(error.response.data.error || 'Error adding student');
    }
  };

  const handleAddClass = async () => {
    try {
      await axios.post('http://localhost:5000/admin/add_class', classData);
      alert('Class added successfully');
      setClassData({ name: '', teacher_id: '' });
      fetchClasses(); // Refresh the list of classes
    } catch (error) {
      alert(error.response.data.error || 'Error adding class');
    }
  };

  const handleEnrollStudent = async () => {
    try {
      await axios.post('http://localhost:5000/admin/enroll_student', enrollmentData);
      alert('Student enrolled successfully');
      setEnrollmentData({ student_id: '', class_id: '' });
    } catch (error) {
      alert(error.response.data.error || 'Error enrolling student');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <div className="form-section">
        <h2>Add Teacher</h2>
        <input
          type="text"
          placeholder="Name"
          value={teacherData.name}
          onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={teacherData.email}
          onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={teacherData.password}
          onChange={(e) => setTeacherData({ ...teacherData, password: e.target.value })}
        />
        <button onClick={handleAddTeacher}>Add Teacher</button>
      </div>

      <div className="form-section">
        <h2>Add Student</h2>
        <input
          type="text"
          placeholder="Name"
          value={studentData.name}
          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={studentData.email}
          onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={studentData.password}
          onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
        />
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      <div className="form-section">
        <h2>Add Class</h2>
        <input
          type="text"
          placeholder="Class Name"
          value={classData.name}
          onChange={(e) => setClassData({ ...classData, name: e.target.value })}
        />
        <select
          value={classData.teacher_id}
          onChange={(e) => setClassData({ ...classData, teacher_id: e.target.value })}
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddClass}>Add Class</button>
      </div>

      <div className="form-section">
        <h2>Enroll Student in Class</h2>
        <select
          value={enrollmentData.student_id}
          onChange={(e) => setEnrollmentData({ ...enrollmentData, student_id: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        <select
          value={enrollmentData.class_id}
          onChange={(e) => setEnrollmentData({ ...enrollmentData, class_id: e.target.value })}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <button onClick={handleEnrollStudent}>Enroll Student</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

import teamMember1 from './images/team1.jpg';
import teamMember2 from './images/team2.jpg';
import teamMember3 from './images/team3.jpg';
import attendanceIcon from './images/ebbb0d76-31d0-4047-a682-efa6e2018f40.jpeg';
import reportIcon from './images/65ccacc3-dc4e-4b25-81a3-1366cf1f1d8a.jpeg';
import analyticsIcon from './images/bd817339-aabb-4bd3-a8f1-50b350708806.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTeacherLogin = () => {
    navigate('/teacher-login');
  };

  const handleStudentLogin = () => {
    navigate('/student-login');
  };

  return (
    <div className="landing-page">
      <div className="parallax-container">
        <div className="content">
          <header className="header">
            <h1 className="main-title">Attendease</h1>
            <p className="site-name">Attendance Tracking System</p>
          </header>

          <section className="cta">
            <h2 className="cta-title">Choose Your Role</h2>
            <div className="button-container">
              <button className="login-btn teacher-btn" onClick={handleTeacherLogin}>Teacher</button>
              <button className="login-btn student-btn" onClick={handleStudentLogin}>Student</button>
            </div>
          </section>

          <section className="features">
            <h2 className="section-title">Key Features</h2>
            <div className="feature-cards">
              <div className="card">
                <div className="icon-container">
                  <img src={attendanceIcon} alt="Attendance Icon" className="icon" />
                </div>
                <h3>Real-time Attendance</h3>
                <p>Track attendance in real-time with a user-friendly interface, enabling both teachers and students to see live updates.</p>
              </div>
              <div className="card">
                <div className="icon-container">
                  <img src={reportIcon} alt="Report Icon" className="icon" />
                </div>
                <h3>Custom Reports</h3>
                <p>Generate detailed reports based on attendance data, filter by class, subject, or date for better analysis.</p>
              </div>
              <div className="card">
                <div className="icon-container">
                  <img src={analyticsIcon} alt="Analytics Icon" className="icon" />
                </div>
                <h3>Analytics & Insights</h3>
                <p>View and analyze trends over time with graphs and insights that help improve attendance and classroom performance.</p>
              </div>
            </div>
          </section>

          <section className="about-us">
            <h2 className="section-title">About Us</h2>
            <div className="team">
              <div className="team-member">
                <img src={teamMember1} alt="Team Member 1" className="team-photo" />
                <h3>Shubh Selugar</h3>
                <p>Frontend Developer</p>
              </div>
              <div className="team-member">
                <img src={teamMember2} alt="Team Member 2" className="team-photo" />
                <h3>Sayuj Gutgutia</h3>
                <p>Backend Developer</p>
              </div>
              <div className="team-member">
                <img src={teamMember3} alt="Team Member 3" className="team-photo" />
                <h3>Priyansh Waghela</h3>
                <p>Frontend Developer</p>
              </div>
            </div>
          </section>

          <section className="how-it-works">
            <h2 className="section-title">How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>Step 1: Login</h3>
                <p>Login securely as a teacher or student to access personalized attendance features.</p>
              </div>
              <div className="step">
                <h3>Step 2: Record Attendance</h3>
                <p>Teachers can mark attendance in real-time, while students can view their attendance history.</p>
              </div>
              <div className="step">
                <h3>Step 3: View Reports</h3>
                <p>Access reports and analytics to monitor attendance trends and improve performance.</p>
              </div>
            </div>
          </section>

          <section className="contact">
            <h2 className="section-title">Contact Us</h2>
            <p>If you have any questions or need support, feel free to contact us.</p>
            <p>Email: support@attendease.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
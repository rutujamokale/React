import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-light p-3" style={{ width: '220px', minHeight: '100vh' }}>
      <h5>Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/assessments">Assessments</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/mentor-feedback">Mentor Feedback</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
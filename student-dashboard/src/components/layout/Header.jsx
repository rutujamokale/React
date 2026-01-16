import React from 'react';

function Header({ studentName, targetRole, readiness, confidence }) {
  return (
    <div className="mb-4">
      <h4>Welcome, {studentName}</h4>
      <p>Target Role: {targetRole} | Readiness: {readiness} | Confidence: {confidence}</p>
      <hr />
    </div>
  );
}

export default Header;
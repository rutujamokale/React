import React from "react";

const MentorDashboard = () => {
 
  const mentorDashboardData = {
    title: "🌼 Transflower Mentors | TFLAssessment Dashboard",
    mentorName: "Ravi Tambade",
    role: "Lead Mentor",
    activeCohorts: 3,
    learners: 86
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        {mentorDashboardData.title}
      </div>

      <div style={styles.infoRow}>
        <span>
          <strong>Mentor:</strong> {mentorDashboardData.mentorName}
        </span>
        <span>
          <strong>Role:</strong> {mentorDashboardData.role}
        </span>
      </div>

      <div style={styles.infoRow}>
        <span>
          <strong>Active Cohorts:</strong> {mentorDashboardData.activeCohorts}
        </span>
        <span>
          <strong>Learners:</strong> {mentorDashboardData.learners}
        </span>
      </div>
    </div>
  );
};


const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "700px",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px"
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px"
  }
};

export default MentorDashboard;

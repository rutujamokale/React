import React from "react";

const MentorDashboard = () => {
 
  // const mentorDashboardData = {
  //   title: "🌼 Transflower Mentors | TFLAssessment Dashboard",
  //   mentorName: "Ravi Tambade",
  //   role: "Lead Mentor",
  //   activeCohorts: 3,
  //   learners: 86
  // };

  return (
    <div className="dashboard-header">
      <p>
          <strong>Transflower Mentors</strong> | {""}<span> TFLAssessment Dashboard</span>
      </p>  
    <div >
        <p>
          <strong>Mentor:</strong><span>Ravi Tambade</span>
           | {""}
          <strong>Role:</strong><span>Lead mentor</span>
        </p>
    </div>
    <div>
      <p>
        <strong> Active Cohorts:</strong><span>3</span>
        {""}
        <strong>Learners:</strong><span>86</span>
      </p>
    </div>
    </div>


   

  );
};

export default MentorDashboard;

  // const styles = {
  //   container: {
  //     border: "1px solid #ccc",
  //     borderRadius: "8px",
  //     padding: "16px",
  //     maxWidth: "700px",
  //     backgroundColor: "#fff",
  //     fontFamily: "Arial, sans-serif"
  //   },
  //   title: {
  //     fontSize: "18px",
  //     fontWeight: "bold",
  //     marginBottom: "12px"
  //   },
  //   infoRow: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     marginBottom: "6px"
  //   }
  // };

  
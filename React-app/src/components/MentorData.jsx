import React from "react";

  function MentorData(){


    const mentorData = {
    mentorName: "Ravi Tambade",
    role: "Lead Mentor",
    activeCohorts: 3,
    learners: 86
  };

  return(
    <div className="MentorData-container">
      <div className="Mentor-title">
           🌼 Transflower Mentors | TFLAssessment MentorData
      </div>
      <div className="MentorData-info">
        <strong>mentor:</strong>{mentorData.mentorName}
      </div>
      <div>
        <strong>role:</strong>{mentorData.role}
      </div>
      <div className="stats">
        <strong>activeCohorts:</strong>{mentorData.activeCohorts}
      </div>
      <div>
        <strong>learners:</strong>{mentorData.learners}
      </div>

    </div>

  )
  }

  export default MentorData;
 
  
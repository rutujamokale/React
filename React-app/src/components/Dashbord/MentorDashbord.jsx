import './MentorDashbord.css'

const MentorDashbord = () => {
    return (
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <span className="flower">🌼</span>
                    <h2>Transflower Mentors | TFLAssessment Dashboard</h2>
                </div>

                <div className="dashboard-body">
                    <div className="info-row">
                        <span><strong>Mentor:</strong> Ravi Tambade</span>
                        <span><strong>Role:</strong> Lead Mentor</span>
                    </div>

                    <div className="info-row">
                        <span><strong>Active Cohorts:</strong> 3</span>
                        <span><strong>Learners:</strong> 86</span>
                    </div>
                </div>
            </div>
    )
};

export default MentorDashbord;
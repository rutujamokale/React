
function TestData() {
    const testData = {
        "ActiveTests": 6,
        "PendingReview": 12,
        "SkillGaps": 18,
        "Alerts": 3
    }

    return (

        <div className="MentorData-container">
            <div className="MentorData-info">
                <p> <strong>Active Tests:</strong></p>
                {testData.ActiveTests}
                <p><strong>Pending Review</strong></p>
                {testData.PendingReview}
                <p><strong>Skill Gaps</strong></p>
                {testData.SkillGaps}
                <p><strong>Alerts</strong></p>
                {testData.Alerts}
            </div>
        </div>
    )
}

export default TestData;
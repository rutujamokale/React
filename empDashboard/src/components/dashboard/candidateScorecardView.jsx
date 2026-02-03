import { useEffect, useState } from "react";

function CandidateScorecardView() {
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/candidate-scorecard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch scorecard");
        }
        return response.json();
      })
      .then((data) => {
        setScorecard(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!scorecard) return null;

  return (
    <div className="card">
      <h2>Candidate Scorecard</h2>

      <p><strong>Name:</strong> {scorecard.candidateName}</p>
      <p><strong>Role Fit:</strong> {scorecard.roleFit}</p>
      <p><strong>Overall Readiness:</strong> {scorecard.overallReadiness}%</p>

      <h3>Metrics</h3>
      <ul>
        <li>Skill Depth: {scorecard.metrics.skillDepth}%</li>
        <li>Project Quality: {scorecard.metrics.projectQuality}%</li>
        <li>Problem Solving: {scorecard.metrics.problemSolving}%</li>
        <li>Learning Consistency: {scorecard.metrics.learningConsistency}%</li>
      </ul>
    </div>
  );
}

export default CandidateScorecardView;

import { useEffect, useState } from "react";

const EmployerAssist = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/employer-assist")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load employer assist data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="card shadow p-4" style={{ width: "520px" }}>
        <h5 className="text-center mb-3">{data.title}</h5>
        <hr />

        <div className="mb-3">
          <h6 className="fw-bold">Strength Areas</h6>
          <ul>
            {data.strengthAreas.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>

          <h6 className="fw-bold">Suggested Questions</h6>
          <ul>
            {data.suggestedQuestions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>

          <h6 className="fw-bold">Risk Areas</h6>
          <ul>
            {data.riskAreas.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployerAssist;

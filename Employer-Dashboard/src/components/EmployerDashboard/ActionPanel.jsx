import ActionPanel from "./ActionPanel";

function EmployerDashboard() {

  const actions = ["Hire", "Train", "Reject"];

  return (
    <div className="Dashboard-Container">
      <ActionPanel actions={actions} />
    </div>
  );
}

export default EmployerDashboard;

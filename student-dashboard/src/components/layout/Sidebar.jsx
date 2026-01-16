import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
    <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
      <h5>Transflower</h5>
      <ul className="nav flex-column mt-4">
        <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/projects">Projects</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/assessments">Assessments</Link></li>
      </ul>
    </div>
  );
}
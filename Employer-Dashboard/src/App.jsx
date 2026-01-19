import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import EmployerDashboard from "./components/EmployerDashboard/EmployerDashboard";
import CandidateRanking from "./components/CandidateRanking";
import CandidateSkills from "./components/CandidateSkills";
import DashboardPanels from "./components/EmployerDashboard/DashboardPanels";

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar always visible */}
        <Sidebar />
        {/* Main content area changes based on route */}
        <div className="flex-grow-1 p-3">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<EmployerDashboard />} />
            {/* Explicit routes */}
            <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
            <Route path="/CandidateRanking" element={<CandidateRanking />} />
            <Route path="/CandidateSkills" element={<CandidateSkills />} />
            <Route path="/DashboardPanels" element={<DashboardPanels />} />

            {/* Fallback route */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
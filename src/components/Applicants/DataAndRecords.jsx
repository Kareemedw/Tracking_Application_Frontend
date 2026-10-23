import { NavLink } from "react-router-dom";
import "./Applicants.css";

function DataAndRecords() {
  return (
    <main>
      <div className="admin__header">
        <h1>Mission: Application Managament Portal - Data and Records</h1>
        <NavLink className="applicant__nav-link" to="/admin-dashboard">
          <p>Admin DashBoard</p>
        </NavLink>
      </div>
    </main>
  );
}

export default DataAndRecords;

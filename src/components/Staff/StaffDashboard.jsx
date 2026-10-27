import { NavLink } from "react-router-dom";
import "./StaffDashBoard.css";

function StaffDashBoard() {
  return (
    <main className="admin__dashboard">
      <div className="admin__dashboard-header">
        <h1>Passport and Citizenship Tracking System (PACTS)</h1>
        <h2>Mission: Application Management Portal</h2>
        <div className="admin__dashboard-header_1">
          <p>Admin Name: Chantal Edwards</p>
          <NavLink to="/" className="dashboard__nav-link">
            <h4>Back to Welcome Page</h4>
          </NavLink>
        </div>
      </div>
      <div className="admin__dashboard-container">
        <NavLink
          to="/admin-dashboard/create-applicant"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin__dashboard-card">
            Create Customer
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/all-applicants"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin__dashboard-card">
            List of all Applicants
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/applicants-ongoing"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin__dashboard-card">
            List of Applicants with applications ongoing
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/applicants-completed"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin__dashboard-card">
            List of Applicants with applications completed
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/data-and-records"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin__dashboard-card">
            Data and Records
          </button>
        </NavLink>
        <button type="button" className="admin__dashboard-card">
          Placeholder for styling purpose only at this stage
        </button>
      </div>
    </main>
  );
}

export default StaffDashBoard;

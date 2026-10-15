import { NavLink } from "react-router-dom";
import "./StaffDashBoard.css";

function StaffDashBoard() {
  return (
    <main className="admin__dashboard">
      <div className="admin__dashboard-header">
        <h1>Mission: Application Managment Portal</h1>
        <p>Admin Name: Chantal Edwards</p>
      </div>
      <div className="admin__dashboard-container">
        <NavLink
          to="/admin-dashboard/create-applicant"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin-dashboard-card">
            Create Customer
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/all-applicants"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin-dashboard-card">
            List of all Applicants
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/applicants-ongoing"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin-dashboard-card">
            List of Applicants with applications ongoing
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/applicants-completed"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin-dashboard-card">
            List of Applicants with applications completed
          </button>
        </NavLink>
        <NavLink
          to="/admin-dashboard/data-and-records"
          className="dashboard__nav-link"
        >
          <button type="button" className="admin-dashboard-card">
            Data and Records
          </button>
        </NavLink>
        <button type="button" className="admin-dashboard-card">
          + Add Card
        </button>
      </div>
    </main>
  );
}

export default StaffDashBoard;

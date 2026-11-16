import { NavLink } from "react-router-dom";
import "./Applicants.css";
import ApplicantTable from "../ApplicantTable/ApplicantTable";

function ApplicantsCompleted({ applicants = [] }) {
  const completedApplicants = applicants.filter(
    (applicant) => applicant.applicationStatus === "approved",
  );

  return (
    <main>
      <div className="admin__header">
        <h1 className="admin__header-title">
          Mission: Application Management Portal - List of Applicants with
          completed applications
        </h1>
        <NavLink className="applicant__nav-link" to="/admin-dashboard">
          <p>Admin DashBoard</p>
        </NavLink>
      </div>
      <ApplicantTable
        applicants={completedApplicants}
        title="Completed Applications"
      />
    </main>
  );
}

export default ApplicantsCompleted;

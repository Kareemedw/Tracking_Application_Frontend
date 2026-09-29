import { NavLink } from "react-router-dom";
import "./Applicants.css";
import ApplicantTable from "../ApplicantTable/ApplicantTable";

function ApplicantsOngoing({ applicants }) {
  return (
    <main>
      <div className="admin__header">
        <h1>
          Mission: Application Management Portal - List of Applicants with
          ongoing applications
        </h1>
        <NavLink className="applicant__nav-link" to="/admin-dashboard">
          <p>Admin DashBoard</p>
        </NavLink>
      </div>
      <ApplicantTable applicants={applicants} />
    </main>
  );
}

export default ApplicantsOngoing;

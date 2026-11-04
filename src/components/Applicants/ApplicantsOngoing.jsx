import { NavLink } from "react-router-dom";
import "./Applicants.css";
import ApplicantTable from "../ApplicantTable/ApplicantTable";

function ApplicantsOngoing({ applicants = [] }) {
  const ongoingApplicants = applicants.filter(
    (applicant) =>
      applicant.applicationStatus === "processing" ||
      applicant.applicationStatus === "actionRequired",
  );

  return (
    <main>
      <div className="admin__header">
        <h1 className="admin__header-title">
          Mission: Application Management Portal - List of Applicants with
          ongoing applications
        </h1>
        <NavLink className="applicant__nav-link" to="/admin-dashboard">
          <p>Admin DashBoard</p>
        </NavLink>
      </div>
      <ApplicantTable
        applicants={ongoingApplicants}
        title="Ongoing Applications"
      />
    </main>
  );
}

export default ApplicantsOngoing;

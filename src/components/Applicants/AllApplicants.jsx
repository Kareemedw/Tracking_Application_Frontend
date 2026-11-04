import { NavLink } from "react-router-dom";
import "./Applicants.css";
import ApplicantTable from "../ApplicantTable/ApplicantTable";

function AllApplicants({ applicants = [], title = "Applicants" }) {
  return (
    <main>
      <div className="admin__header">
        <h1 className="admin__header-title">
          Mission: Application Management Portal - List of Applicants
        </h1>
        <NavLink className="applicant__nav-link" to="/admin-dashboard">
          <p>Admin DashBoard</p>
        </NavLink>
      </div>
      <ApplicantTable applicants={applicants} title="All Applicants" />
    </main>
  );
}

export default AllApplicants;

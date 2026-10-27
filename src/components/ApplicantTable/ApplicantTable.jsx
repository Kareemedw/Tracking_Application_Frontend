import { useNavigate } from "react-router-dom";
import "./ApplicantTable.css";

function ApplicantTable({ applicants, firstName, lastName }) {
  const navigate = useNavigate();

  return (
    <div className="applicant__table-container">
      <h2 className="applicant__table-title">Applicants</h2>

      <table className="applicant__table">
        <thead>
          <tr>
            <th className="applicant__table-th">Name</th>
            <th className="applicant__table-th">Application Number</th>
            <th className="applicant__table-th">Account Status</th>
            <th className="applicant__table-th">Application Status</th>
          </tr>
        </thead>

        <tbody className="applicant__table-tbody">
          {applicants.map((applicant) => (
            <tr
              className="applicant__table-tbody_tr"
              key={applicant._id}
              onClick={() =>
                navigate(
                  `/admin-dashboard/customer-controller/${applicant._id}`,
                )
              }
            >
              <td className="applicant__table-td">
                {applicant.firstName} {applicant.lastName}
              </td>

              <td className="applicant__table-td">
                {applicant.applicationNumber}
              </td>

              <td className="applicant__table-td">{applicant.accountStatus}</td>

              <td className="applicant__table-td">
                {applicant.applicationStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantTable;

import "./ApplicantTable.css";

function ApplicantTable({ applicants }) {
  return (
    <div className="applicant-table__container">
      <h2 className="applicant-table__title">Applicants</h2>

      <table className="applicant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Application Number</th>
            <th>Account Status</th>
            <th>Application Status</th>
          </tr>
        </thead>

        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <td>{applicant.name}</td>

              <td>{applicant.applicationNumber}</td>

              <td>{applicant.accountStatus}</td>

              <td>{applicant.applicationStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicantTable;

import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!applicantId) return;

    const getApplicant = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/applicants/${applicantId}`,
        );

        const data = await res.json();

        console.log("APPLICANT FROM BACKEND:", data);

        if (!res.ok) {
          throw new Error(data.message || "Unable to retrieve applicant");
        }

        setApplicant(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getApplicant();
  }, [applicantId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!applicant) {
    return <p>Loading applicant...</p>;
  }

  return (
    <main className="header">
      <div className="header__title">
        <h1>Passport And Citizens Tracking System(PACTS)</h1>
      </div>
      <div className="header__title-customer">
        <h1>Application Tracking Progress</h1>
        <p>
          Applicant: {applicant.firstName} {applicant.lastName}
        </p>
        <p>Application Number: {applicant.applicationNumber}</p>
      </div>
      <div className="header__colorCode">
        <p className="header__colorCode-title">Status Key:</p>
        <div className="header__status">
          <span className="header__dot header__dot_stageNotStarted"></span>
          <span>Stage Not Started</span>
        </div>
        <div className="header__status">
          <span className="header__dot header__dot_inProgress"></span>
          <span>In Progress</span>
        </div>
        <div className="header__status">
          <span className="header__dot header__dot_approved"></span>
          <span>Approved</span>
        </div>
        <div className="header__status">
          <span className="header__dot header__dot_actionRequired"></span>
          <span>Action Required</span>
        </div>
      </div>
    </main>
  );
}

export default Header;

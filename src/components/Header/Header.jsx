import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { BASE_URL } from "../../utils/constants";
import { getCustomerApplicant } from "../../utils/api";

function Header({ mustChangePassword }) {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getApplicant = async () => {
      try {
        setError("");

        const data = await getCustomerApplicant(applicantId);

        console.log("APPLICANT FROM BACKEND:", data);

        const currentApplicant = data.applicant ?? data;

        if (currentApplicant.mustChangePassword) {
          navigate(
            `/login/new-password/${currentApplicant.id ?? currentApplicant._id}`,
            { replace: true },
          );
          return;
        }

        setApplicant(currentApplicant);
      } catch (err) {
        console.error("Unable to retrieve applicant:", err);

        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getApplicant();
  }, [applicantId]);

  if (isLoading) {
    return <p>Loading applicant information...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!applicant) {
    return <p>Loading applicant...</p>;
  }

  return (
    <main className="header">
      <div className="header__title">
        <h1>Passport And Citizenship Tracking System (PACTS)</h1>
        <NavLink to="/" className="nav__link">
          <h4>Back to Welcome Page</h4>
        </NavLink>
      </div>
      <div className="header__title-customer">
        <p>
          {applicant.firstName} {applicant.lastName}
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

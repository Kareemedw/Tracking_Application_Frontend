import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./Header.css";
import { BASE_URL } from "../../utils/constants";
import { getCustomerApplicant } from "../../utils/api";

function StaffHeader() {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!applicantId) return;

    const getApplicant = async () => {
      try {
        const data = await getCustomerApplicant(applicantId);

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
    return <p>Error: Authorization required</p>;
  }

  if (!applicant) {
    return <p></p>;
  }

  return (
    <main className="header">
      <div className="header__title">
        <h1>Passport And Citizenship Tracking System (PACTS)</h1>
      </div>
    </main>
  );
}

export default StaffHeader;

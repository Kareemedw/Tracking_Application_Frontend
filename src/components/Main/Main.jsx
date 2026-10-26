import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import MessagePanel from "../MessagePanel/MessagePanel";
import "./Main.css";
import { BASE_URL } from "../../utils/constants";
import { getApplicant } from "../../utils/api";

function Main({ mustChangePassword }) {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const statusInfo = {
    stageNotStarted: {
      label: "Stage Not Started",
    },
    processing: {
      label: "Processing",
    },
    approved: {
      label: "Approved",
    },
    actionRequired: {
      label: "Action Required",
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getApplicantCustomer = async () => {
      try {
        setError("");

        const data = await getApplicant(applicantId);

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

    getApplicantCustomer();
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

  const selectedStep =
    applicant.steps?.find((step) => step.stepNumber === selectedStepId) || null;

  return (
    <main className="tracker__container">
      <MessagePanel selectedStep={selectedStep} statusInfo={statusInfo} />
      <div className="tracker">
        {applicant.steps?.map((step) => {
          const status = statusInfo[step.status];

          return (
            <div className="step__container" key={step.stepNumber}>
              <button
                type="button"
                className={`step step--${step.status}`}
                onClick={() => setSelectedStepId(step.stepNumber)}
              >
                <div className="circle">{step.stepNumber}</div>

                <div className="label">{step.label}</div>

                <div className="step__comment">
                  <strong>{status?.label || "Unknown Status"}</strong>
                  <p>
                    {step.message?.[step.status] ||
                      "No message has been provided."}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Main;

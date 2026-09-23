import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import MessagePanel from "../MessagePanel/MessagePanel";
import "./Main.css";

function Main() {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const [error, setError] = useState("");

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

  const selectedStep =
    applicant.steps?.find((step) => step.stepNumber === selectedStepId) || null;

  return (
    <main className="tracker-container">
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
      <MessagePanel selectedStep={selectedStep} statusInfo={statusInfo} />
    </main>
  );
}

export default Main;

import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./AdminController.css";

function AdminController() {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [messageDrafts, setMessageDrafts] = useState({});
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

  const handleStatusChange = async (stepNumber, newStatus) => {
    console.log("applicantId:", applicantId);
    console.log("step.id:", stepNumber);
    console.log("newStatus:", newStatus);

    if (!applicantId || !stepNumber) {
      setError("Missing applicant or step identifier.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/applicants/${applicantId}/steps/${stepNumber}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to update status");
      }

      setApplicant(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMessageInputChange = (stepNumber, newMessage) => {
    console.log("TYPING:", newMessage);

    setMessageDrafts((previousDrafts) => ({
      ...previousDrafts,
      [stepNumber]: newMessage,
    }));
  };

  const handleMessageSave = async (stepNumber) => {
    const newMessage = messageDrafts[stepNumber] ?? "";

    if (!newMessage?.trim()) {
      return;
    }

    console.log("----- SAVE MESSAGE -----");
    console.log("STEP NUMBER:", stepNumber);
    console.log("MESSAGE DRAFTS:", messageDrafts);
    console.log("MESSAGE BEING SENT:", newMessage);

    try {
      const res = await fetch(
        `http://localhost:5001/applicants/${applicantId}/steps/${stepNumber}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            actionRequiredMessage: newMessage,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to update message");
      }

      setApplicant(data);

      const savedStep = data.steps?.find(
        (step) => step.stepNumber === Number(stepNumber),
      );

      setMessageDrafts((previousDrafts) => {
        const updatedDrafts = {
          ...previousDrafts,
        };

        delete updatedDrafts[stepNumber];

        return updatedDrafts;
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <main className="admin__container">
      <div className="admin__header">
        <h1>Mission: Application Managment Portal</h1>
        <p>
          Name: {applicant.firstName} {applicant.lastName}
        </p>
        <p>Application Number: {applicant.applicationNumber}</p>
        <NavLink
          className="applicant__nav-link"
          to="/admin-dashboard/all-applicants"
        >
          <h3>List of All Applicants</h3>
        </NavLink>
      </div>
      {applicant.steps?.map((step) => (
        <div className="step__controller" key={step._id || step.id}>
          <h2>Stage</h2>

          <p>{step.label}</p>

          <label htmlFor={`status-${step.stepNumber}`}>Status</label>

          <select
            id={`status-${step.stepNumber}`}
            value={step.status}
            onChange={(e) =>
              handleStatusChange(step.stepNumber, e.target.value)
            }
          >
            <option value="stageNotStarted">Stage Not Started</option>

            <option value="processing">Processing</option>

            <option value="approved">Approved</option>

            <option value="actionRequired">Action Required</option>
          </select>

          {step.status === "actionRequired" && (
            <div className="action__message" key={step.id}>
              <label htmlFor={`message-${step.stepNumber}`}>
                Message to applicant
              </label>

              <textarea
                id={`message-${step.stepNumber}`}
                value={
                  messageDrafts[step.stepNumber] ??
                  step.message?.actionRequired ??
                  ""
                }
                onChange={(e) =>
                  handleMessageInputChange(step.stepNumber, e.target.value)
                }
                placeholder="Explain what action the applicant needs to take..."
              />
              <button
                type="button"
                onClick={() => handleMessageSave(step.stepNumber)}
              >
                Save Message
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default AdminController;

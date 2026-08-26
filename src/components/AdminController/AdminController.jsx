import "./AdminController.css";

function AdminController({ handleStatusChange, steps, handleMessageChange }) {
  return (
    <main className="admin__container">
      <div className="admin__header">
        <h1>Mission: Application Managment Portal</h1>
        <p>Name: Kareem Edwards</p>
        <p>Application Number: ABCDE11111</p>
      </div>
      {steps.map((step) => (
        <div className="step__controller" key={step.id}>
          <h2>Stage {step.id}</h2>

          <p>{step.label}</p>

          <label htmlFor={`status-${step.id}`}>Status</label>

          <select
            id={`status-${step.id}`}
            value={step.status}
            onChange={(e) => handleStatusChange(step.id, e.target.value)}
          >
            <option value="processing">Processing</option>

            <option value="approved">Approved</option>

            <option value="actionRequired">Action Required</option>
          </select>

          {step.status === "actionRequired" && (
            <div className="action__message">
              <label htmlFor={`message-${step.id}`}>Message to applicant</label>

              <textarea
                id={`message-${step.id}`}
                value={step.message.actionRequired || ""}
                onChange={(e) => handleMessageChange(step.id, e.target.value)}
                placeholder="Explain what action the applicant needs to take..."
              />
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default AdminController;

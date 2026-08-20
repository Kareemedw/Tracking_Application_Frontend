import "./Main.css";

function Main({ steps, statusInfo, handleStatusChange }) {
  return (
    <div className="tracker-container">
      <div className="tracker">
        {steps.map((step) => {
          const status = statusInfo[step.status];

          return (
            <div className="step__container" key={step.id}>
              <button className={`step step--${step.status}`}>
                <div className="circle">{step.id}</div>

                <div className="label">{step.label}</div>

                <div className="step__comment">
                  <strong>{status.label}</strong>
                  <p>{status.message}</p>
                </div>
              </button>
              <div className="step-controller">
                <label htmlFor={`status-${step.id}`}>Status</label>

                <select
                  id={`status-${step.id}`}
                  value={step.status}
                  onChange={(e) => handleStatusChange(step.id, e.target.value)}
                >
                  <option value="processing">In Processing</option>
                  <option value="approved">Approved</option>
                  <option value="actionRequired">Action Required</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;

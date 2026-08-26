import MessagePanel from "../MessagePanel/MessagePanel";
import "./Main.css";

function Main({ steps, statusInfo, selectedStep, setSelectedStepId }) {
  return (
    <main className="tracker-container">
      <div className="tracker">
        {steps.map((step) => {
          const status = statusInfo[step.status];

          return (
            <div className="step__container" key={step.id}>
              <button
                type="button"
                className={`step step--${step.status}`}
                onClick={() => setSelectedStepId(step.id)}
              >
                <div className="circle">{step.id}</div>

                <div className="label">{step.label}</div>

                <div className="step__comment">
                  <strong>{status.label}</strong>
                  <p>
                    {step.message[step.status] ||
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

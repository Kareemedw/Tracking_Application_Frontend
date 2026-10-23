import "../Main/Main.css";

function MessagePanel({ selectedStep, statusInfo }) {
  // Look up the status object once for readability and safety
  const currentStatus =
    statusInfo && selectedStep ? statusInfo[selectedStep.status] : null;

  console.log("CUSTOMER SELECTED STEP:", selectedStep);
  console.log("CUSTOMER MESSAGE:", selectedStep?.message?.actionRequired);

  return (
    <main className="message__panel">
      {selectedStep ? (
        <>
          <h2>Stage {selectedStep.stepNumber}</h2>

          {/* Use optional chaining (?.) to prevent crashes if the status key is missing */}
          <h3>{currentStatus?.label || "Unknown Status"}</h3>

          <h3>{selectedStep.label}</h3>

          <p>
            {selectedStep.message?.[selectedStep.status] ||
              "No message has been provided."}
          </p>
        </>
      ) : (
        <p>Select a stage to view more information.</p>
      )}
    </main>
  );
}

export default MessagePanel;

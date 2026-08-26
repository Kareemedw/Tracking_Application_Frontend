import "../Main/Main.css";

function MessagePanel({ statusInfo, selectedStep }) {
  // Look up the status object once for readability and safety
  const currentStatus =
    statusInfo && selectedStep ? statusInfo[selectedStep.status] : null;

  return (
    <main className="message__panel">
      {selectedStep ? (
        <>
          <h2>Stage {selectedStep.id}</h2>

          {/* Use optional chaining (?.) to prevent crashes if the status key is missing */}
          <h3>{currentStatus?.label || "Unknown Status"}</h3>

          <h3>{selectedStep.label}</h3>

          <p>
            {selectedStep.message[selectedStep.status] ||
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

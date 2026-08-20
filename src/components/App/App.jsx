import { useState } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const statusInfo = {
    processing: {
      label: "In Processing",
      message: "The stage is currently being processed.",
    },
    approved: { label: "Approved", message: "This stage has been approved." },
    actionRequired: {
      label: "Action Required",
      message: "Additional action is required for this stage.",
    },
  };

  const [steps, setSteps] = useState([
    {
      id: 1,
      label: "Mission receives application and is under review",
      status: "processing",
    },
    {
      id: 2,
      label:
        "Application passes first screening and sent to Immigration Office",
      status: "processing",
    },
    {
      id: 3,
      label: "Immigration Office receives application and is under review",
      status: "processing",
    },
    {
      id: 4,
      label: 'Application approved "Document" sent to Mission',
      status: "processing",
    },
    {
      id: 5,
      label: 'Mission receives "Document"',
      status: "processing",
    },
  ]);

  const handleStatusChange = (stepId, newStatus) => {
    setSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId ? { ...step, status: newStatus } : step,
      ),
    );
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          statusInfo={statusInfo}
          steps={steps}
          handleStatusChange={handleStatusChange}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;

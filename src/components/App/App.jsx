import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdminController from "../AdminController/AdminController";
import CreateCustomer from "../CreateCustomer/CreateCustomer";
import "./App.css";
import StaffDashBoard from "../StaffDashBoard/StaffDashBoard";
import AllApplicants from "../Applicants/AllApplicants";
import ApplicantsOngoing from "../Applicants/ApplicantsOngoing";
import ApplicantsCompleted from "../Applicants/ApplicantsCompleted";
import DataAndRecords from "../Applicants/DataAndRecords";

function App() {
  const statusInfo = {
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

  const [steps, setSteps] = useState([
    {
      id: 1,
      label: "Mission is in receipt of your application",
      status: "processing",
      message: {
        processing:
          "Your application has been received by the Mission and is currently being reviewed.",
        approved:
          "Your application has passed first screening and is being prepared to be sent to the Immigration office",
        actionRequired: "",
      },
    },
    {
      id: 2,
      label: "Application passes first screening",
      status: "processing",
      message: {
        processing: "Your application is enroute to the Immigration Office.",
        approved:
          "Your application is in it's final stages to the Immigration Office",
        actionRequired: "",
      },
    },
    {
      id: 3,
      label: "Immigration Office is in reciept of your application",
      status: "processing",
      message: {
        processing:
          "The Immigration Office has received your application and is currently conducting its review.",
        approved: "Your Application has been approved",
        actionRequired: "",
      },
    },
    {
      id: 4,
      label: 'Application approved "Document" sent to Mission',
      status: "processing",
      message: {
        processing:
          "The Immigration Office has approved your application and is preparing to dispatch your 'Document' to the mission.",
        approved: "Immigration Office has dispatch your 'Document'",
        actionRequired: "",
      },
    },
    {
      id: 5,
      label: 'Mission is in reciept of your "Document"',
      status: "processing",
      message: {
        processing:
          "The Mission has received your new 'Document' and is preparing to mail it to your address on file.",
        approved: "The Mission has mailed your 'Document'",
        actionRequired: "",
      },
    },
  ]);

  const [selectedStepId, setSelectedStepId] = useState(null);

  const [applicationNumber, setApplicationNumber] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");

  const selectedStep = steps.find((step) => step.id === selectedStepId) || null;

  const handleStatusChange = (stepId, newStatus) => {
    setSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId ? { ...step, status: newStatus } : step,
      ),
    );
  };

  const handleMessageChange = (stepId, newMessage) => {
    setSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              message: {
                ...step.message,
                actionRequired: newMessage,
              },
            }
          : step,
      ),
    );
  };

  const applicants = [
    {
      id: 1,
      name: "Kareem Edwards",
      applicationNumber: "ABCDE11111",
      Status: "Permanent",
      applicationStatus: "In process",
    },
    {
      id: 2,
      name: "Jane Smith",
      applicationNumber: "ABCDE11112",
      Status: "Temproary",
      applicationStatus: "In process",
    },
    {
      id: 3,
      name: "John Doe",
      applicationNumber: "ABCDE11113",
      Status: "Temporary",
      applicationStatus: "Approved",
    },
    {
      id: 4,
      name: "Jane Doe",
      applicationNumber: "ABCDE11114",
      Status: "Permanent",
      applicationStatus: "Approved",
    },
  ];

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main
                  statusInfo={statusInfo}
                  steps={steps}
                  handleStatusChange={handleStatusChange}
                  selectedStep={selectedStep}
                  setSelectedStepId={setSelectedStepId}
                  handleMessageChange={handleMessageChange}
                />
              </>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <>
                <StaffDashBoard />
              </>
            }
          />
          <Route
            path="/admin-dashboard/create-applicant"
            element={
              <>
                <CreateCustomer
                  applicationNumber={applicationNumber}
                  firstName={firstName}
                  lastName={lastName}
                  password={password}
                  setApplicationNumber={setApplicationNumber}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setPassword={setPassword}
                />
              </>
            }
          />
          <Route
            path="/admin-dashboard/all-applicants"
            element={
              <>
                <AllApplicants applicants={applicants} />
              </>
            }
          />
          <Route
            path="/admin-dashboard/applicants-ongoing"
            element={
              <>
                <ApplicantsOngoing applicants={applicants} />
              </>
            }
          />
          <Route
            path="/admin-dashboard/applicants-completed"
            element={
              <>
                <ApplicantsCompleted applicants={applicants} />
              </>
            }
          />
          <Route
            path="/admin-dashboard/data-and-records"
            element={
              <>
                <DataAndRecords />
              </>
            }
          />
          <Route
            path="/admin-dashboard/customer-controller"
            element={
              <>
                <AdminController
                  handleStatusChange={handleStatusChange}
                  handleMessageChange={handleMessageChange}
                  steps={steps}
                />
              </>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

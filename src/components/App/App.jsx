import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdminController from "../AdminController/AdminController";
import CreateCustomer from "../Customer/CreateCustomer";
import "./App.css";
import StaffDashBoard from "../Staff/StaffDashBoard";
import AllApplicants from "../Applicants/AllApplicants";
import ApplicantsOngoing from "../Applicants/ApplicantsOngoing";
import ApplicantsCompleted from "../Applicants/ApplicantsCompleted";
import DataAndRecords from "../Applicants/DataAndRecords";
import CustomerLogin from "../Customer/CustomerLogin";
import StaffLogin from "../Staff/StaffLoginAndRegistration/StaffLogin";
import StaffRegistration from "../Staff/StaffLoginAndRegistration/StaffRegistration";

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

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const selectedStep = steps.find((step) => step.id === selectedStepId) || null;

  const [temporaryPassword, setTemporaryPassword] = useState("");

  const [error, setError] = useState("");

  const [applicants, setApplicants] = useState("");

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const token = localStorage.getItem("staffToken");

        const res = await fetch("http://localhost:5001/applicants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Unable to retrieve applicants");
        }

        setApplicants(data);
      } catch (err) {
        console.error(err);
      }
    };

    getApplicants();
  }, []);

  const handleStatusChange = (stepId, newStatus) => {
    setSteps((currentSteps) =>
      currentSteps.map((step) =>
        step.id === stepId ? { ...step, status: newStatus } : step,
      ),
    );
  };

  const handleMessageChange = async (stepId, newMessage) => {
    try {
      const token = localStorage.getItem("staffToken");

      const res = await fetch(
        `http://localhost:5001/applicants/${applicantId}/steps/${stepNumber}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const updatedApplicant = await res.json();

      setApplicant(updatedApplicant);
    } catch (err) {
      console.error(err);
    }
  };

  // const applicants = [
  //   {
  //     id: 1,
  //     name: "Kareem Edwards",
  //     applicationNumber: "ABCDE11111",
  //     Status: "Permanent",
  //     applicationStatus: "In process",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     applicationNumber: "ABCDE11112",
  //     Status: "Temproary",
  //     applicationStatus: "In process",
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe",
  //     applicationNumber: "ABCDE11113",
  //     Status: "Temporary",
  //     applicationStatus: "Approved",
  //   },
  //   {
  //     id: 4,
  //     name: "Jane Doe",
  //     applicationNumber: "ABCDE11114",
  //     Status: "Permanent",
  //     applicationStatus: "Approved",
  //   },
  // ];

  // const [temporaryPassword, setTemporaryPassword] = useState("");

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CustomerLogin
                  applicationNumber={applicationNumber}
                  lastName={lastName}
                  password={password}
                  setApplicationNumber={setApplicationNumber}
                  setLastName={setLastName}
                  setPassword={setPassword}
                />
              </>
            }
          />
          <Route
            path="/staff-login"
            element={
              <>
                <StaffLogin
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              </>
            }
          />
          <Route
            path="/staff-registration"
            element={
              <>
                <StaffRegistration
                  email={email}
                  password={password}
                  confirmPassword={confirmPassword}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                />
              </>
            }
          />
          <Route
            path="/customer-dashboard"
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
                  setEmail={setEmail}
                  temporaryPassword={temporaryPassword}
                  setTemporaryPassword={setTemporaryPassword}
                  error={error}
                  setError={setError}
                />
              </>
            }
          />
          <Route
            path="/admin-dashboard/all-applicants"
            element={
              <>
                <AllApplicants
                  applicants={applicants}
                  setApplicants={setApplicants}
                />
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

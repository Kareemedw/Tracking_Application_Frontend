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
import NewPassword from "../Customer/NewPassword";
import { BASE_URL } from "../../utils/constants";
import LandingPage from "../LandingPage/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
// import StaffHeader from "../Header/StaffHeader";

function App() {
  const [selectedStepId, setSelectedStepId] = useState(null);

  const [applicant, setApplicant] = useState(null);

  const [applicationNumber, setApplicationNumber] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  //const selectedStep = steps.find((step) => step.id === selectedStepId) || null;

  const [temporaryPassword, setTemporaryPassword] = useState("");

  const [error, setError] = useState("");

  const [applicants, setApplicants] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userRole, setUserRole] = useState(false);

  const [mustChangePassword, setMustChangePassword] = useState(true);

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const getApplicants = async () => {
      try {
        const token = localStorage.getItem("staffToken");

        const res = await fetch(`${BASE_URL}/applicants`, {
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

  const selectedStep =
    applicant?.steps?.find((step) => step.stepNumber === selectedStepId) ||
    null;

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <CustomerLogin
                  applicationNumber={applicationNumber}
                  lastName={lastName}
                  password={password}
                  setApplicationNumber={setApplicationNumber}
                  setLastName={setLastName}
                  setPassword={setPassword}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                  mustChangePassword={mustChangePassword}
                  setMustChangePassword={setMustChangePassword}
                />
              </>
            }
          />
          <Route
            path="/login/new-password/:applicantId"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                allowedRoles={["customer"]}
              >
                <NewPassword
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  setMustChangePassword={setMustChangePassword}
                />
              </ProtectedRoute>
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
            path="/customer-dashboard/:applicantId"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                allowedRoles={["customer"]}
                mustChangePassword={mustChangePassword}
              >
                <Header mustChangePassword={mustChangePassword} />
                <Main mustChangePassword={mustChangePassword} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <>
                {/* <StaffHeader /> */}
                <StaffDashBoard />
              </>
            }
          />
          <Route
            path="/admin-dashboard/create-applicant"
            element={
              <>
                {/* <StaffHeader /> */}
                <CreateCustomer
                  applicationNumber={applicationNumber}
                  firstName={firstName}
                  lastName={lastName}
                  password={password}
                  email={email}
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
                  firstName={firstName}
                  lastName={lastName}
                />
              </>
            }
          />
          <Route
            path="/admin-dashboard/applicants-ongoing/"
            element={
              <>
                <ApplicantsOngoing applicants={applicants} />
              </>
            }
          />
          <Route
            path="/admin-dashboard/applicants-completed/"
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
            path="/admin-dashboard/customer-controller/:applicantId"
            element={
              <>
                <AdminController selectedStep={selectedStep} />
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

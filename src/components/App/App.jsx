import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  NavLink,
  useParams,
} from "react-router-dom";
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
import {
  getApplicants,
  getCustomerApplicant,
  getCurrentCustomer,
} from "../../utils/api";
// import StaffHeader from "../Header/StaffHeader";

const validateForm = (values) => {
  const errors = {};

  // Application Number
  if ("applicationNumber" in values) {
    if (!values.applicationNumber?.trim()) {
      errors.applicationNumber = "Application number is required";
    }
  }

  // First Name
  if ("firstName" in values) {
    if (!values.firstName?.trim()) {
      errors.firstName = "First name is required";
    }
  }

  // Last Name
  if ("lastName" in values) {
    if (!values.lastName?.trim()) {
      errors.lastName = "Last name is required";
    }
  }

  // Email
  if ("email" in values) {
    if (!values.email?.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  // Login Password
  if ("password" in values) {
    if (!values.password) {
      errors.password = "Password is required";
    }
  }

  // New Password
  if ("newPassword" in values) {
    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    } else if (values.newPassword.length < 6) {
      errors.newPassword = "Password must contain at least 6 characters";
    }
  }

  // Confirm Password
  if ("confirmPassword" in values) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (
      "newPassword" in values &&
      values.confirmPassword !== values.newPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  return errors;
};

function App() {
  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

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

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("applicantToken"));
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("applicantToken") ? "customer" : null;
  });

  const [mustChangePassword, setMustChangePassword] = useState(true);

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const handleValidate = (values) => {
    const validationErrors = validateForm(values);

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // const { applicantId } = useParams();
  const [applicantId, setApplicantId] = useState(null);

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getApplicants();

        setApplicants(data.applicants ?? data);
      } catch (err) {
        console.error("Unable to retrieve applicants:", err);
      }
    };

    fetchApplicants();
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("applicantToken");

      if (!token || token === "undefined" || token === "null") {
        setIsLoggedIn(false);
        setUserRole(null);
        setMustChangePassword(false);
        setIsAuthLoading(false);
        return;
      }

      try {
        const data = await getCurrentCustomer();

        setIsLoggedIn(true);
        setUserRole("customer");
        setMustChangePassword(data.applicant.mustChangePassword);
      } catch (err) {
        console.error("Session verification failed:", err);

        // localStorage.removeItem("applicantToken");
        setIsLoggedIn(false);
        setUserRole(null);
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem("applicantToken");
        }
      } finally {
        setIsAuthLoading(false);
      }
    };

    restoreSession();
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
                  validateForm={validateForm}
                  setErrors={setErrors}
                  errors={errors}
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
                isAuthLoading={isAuthLoading}
                applicantId={applicantId}
              >
                <NewPassword
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  setMustChangePassword={setMustChangePassword}
                  validateForm={validateForm}
                  setErrors={setErrors}
                  errors={errors}
                  setError={setError}
                  error={error}
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
                isAuthLoading={isAuthLoading}
                applicantId={applicantId}
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
                  validateForm={validateForm}
                  setErrors={setErrors}
                  errors={errors}
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
                <AdminController
                  selectedStep={selectedStep}
                  applicantId={applicantId}
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

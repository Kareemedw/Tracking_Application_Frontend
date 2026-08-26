import { NavLink } from "react-router-dom";
import "./CreateCustomer.css";

function CreateCustomer({
  applicationNumber,
  setApplicationNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) {
  return (
    <main className="create__customer">
      <div className="admin__header">
        <h1>Mission: Application Managament Portal</h1>
        <NavLink to="/admin-dashboard" className="dashboard__nav-link">
          <p>Admin DashBoard</p>
        </NavLink>
      </div>
      <div className="create__customer-container">
        <h1 className="create__customer-title">Create Applicant Login</h1>
        <p>Create login credentials for a new applicant</p>
        <form className="create__customer-form">
          <label htmlFor="applicationNumber">Application Number</label>
          <input
            type="text"
            id="applicationNumber"
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
          />
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">Create Applicant</button>
        </form>
      </div>
    </main>
  );
}

export default CreateCustomer;

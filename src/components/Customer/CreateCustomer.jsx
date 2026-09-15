import { NavLink } from "react-router-dom";
import handleSubmit from "../../utils/api";
import "./Customer.css";

function CreateCustomer({
  applicationNumber,
  setApplicationNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  temporaryPassword,
  error,
  setError,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const res = await fetch("http://localhost:5001/applicants", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          applicationNumber,
          firstName,
          lastName,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to create applicant");
      }

      console.log("Applicant created:", data);

      setTemporaryPassword(data.temporaryPassword);

      setApplicationNumber("");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

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
        <form className="create__customer-form" onSubmit={handleSubmit}>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Create Applicant</button>
        </form>
        {temporaryPassword && (
          <div className="temporary-password">
            <h3>Applicant Created Successfully</h3>

            <p>
              Temporary Password:
              <strong> {temporaryPassword}</strong>
            </p>

            <p>
              Provide this password to the applicant. They will be required to
              change it after their first login.
            </p>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}
      </div>
    </main>
  );
}

export default CreateCustomer;

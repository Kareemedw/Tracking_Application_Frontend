import { NavLink } from "react-router-dom";
//import handleSubmit from "../../utils/api";
import "./Customer.css";
import { BASE_URL } from "../../utils/constants";
import { createApplicant } from "../../utils/api";

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
  setTemporaryPassword,
  error,
  setError,
  validateForm,
  setErrors,
  errors,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      applicationNumber,
      firstName,
      lastName,
      email,
    };

    const validationErrors = validateForm(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setError("");

      console.log("FORM EMAIL:", email);

      const data = await createApplicant({
        applicationNumber,
        firstName,
        lastName,
        email,
      });

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
          <p className="customer__container-p">Admin DashBoard</p>
        </NavLink>
      </div>
      <div className="customer__container">
        <h1 className="customer__title">Create Applicant Login</h1>
        <p className="customer__container-p">
          Create login credentials for a new applicant
        </p>
        <form className="customer__form" onSubmit={handleSubmit}>
          <label className="customer__form-label" htmlFor="applicationNumber">
            Application Number
          </label>
          <input
            type="text"
            id="applicationNumber"
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
            className={`customer__form-input ${
              errors.password ? "customer__form-input_error" : ""
            }`}
          />
          {errors.applicationNumber && (
            <p className="form__error">{errors.applicationNumber}</p>
          )}
          <label className="customer__form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`customer__form-input ${
              errors.password ? "customer__form-input_error" : ""
            }`}
          />
          {errors.firstName && (
            <p className="form__error">{errors.firstName}</p>
          )}
          <label htmlFor="lastName" className="customer__form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`customer__form-input ${
              errors.password ? "customer__form-input_error" : ""
            }`}
          />
          {errors.lastName && <p className="form__error">{errors.lastName}</p>}
          <label htmlFor="email" className="customer__form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`customer__form-input ${
              errors.password ? "customer__form-input_error" : ""
            }`}
          />
          {errors.email && <p className="form__error">{errors.email}</p>}
          <button className="customer__form-button" type="submit">
            Create Applicant
          </button>
        </form>
        {temporaryPassword && (
          <div className="temporary-password">
            <h3>Applicant Created Successfully</h3>

            <p className="customer__container-p">
              Temporary Password:
              <strong> {temporaryPassword}</strong>
            </p>

            <p className="customer__container-p">
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

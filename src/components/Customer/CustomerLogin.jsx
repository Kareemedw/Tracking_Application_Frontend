import { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { signinApplicant } from "../../utils/api";
import "./Customer.css";

function CustomerLogin({
  applicationNumber,
  lastName,
  password,
  setApplicationNumber,
  setLastName,
  setPassword,
  setIsLoggedIn,
  setUserRole,
  mustChangePassword,
  setMustChangePassword,
  validateForm,
  errors,
  setErrors,
}) {
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const values = {
      applicationNumber,
      lastName,
      password,
    };

    const validationErrors = validateForm(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const data = await signinApplicant({
        applicationNumber,
        lastName,
        password,
      });

      localStorage.setItem("applicantToken", data.token);

      setIsLoggedIn(true);
      setUserRole("customer");
      setMustChangePassword(data.mustChangePassword);

      if (data.mustChangePassword) {
        navigate(`/login/new-password/${data.applicant.id}`, { replace: true });
      } else {
        navigate(`/customer-dashboard/${data.applicant.id}`, {
          replace: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="customer__login">
      <div className="admin__header">
        <h1>Passport And Citizenship Tracking System (PACTS)</h1>
        <NavLink to="/" className="nav__link">
          <h4>Back to Welcome Page</h4>
        </NavLink>
      </div>
      <div className="customer__container">
        <h1 className="customer__title"> Applicant Login</h1>
        <p>Please Login to track your application</p>
        <form onSubmit={handleLoginSubmit} className="customer__form">
          <input
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
            placeholder="Application Number"
            className={errors.applicationNumber ? "form__input--error" : ""}
          />
          {errors.applicationNumber && (
            <p className="form__error">{errors.applicationNumber}</p>
          )}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className={errors.lastName ? "form__input--error" : ""}
          />
          {errors.lastName && <p className="form__error">{errors.lastName}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={errors.password ? "form__input--error" : ""}
          />
          {errors.password && <p className="form__error">{errors.password}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default CustomerLogin;

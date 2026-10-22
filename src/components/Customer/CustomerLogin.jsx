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
}) {
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

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
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default CustomerLogin;

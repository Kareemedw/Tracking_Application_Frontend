import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../../assets/pacts-logo.png";

function LandingPage() {
  return (
    <main className="landing">
      <div className="landing__container">
        <div className="landing__header">
          <div className="landing__header-1">
            <h3>Pacts</h3>
            <p>Application Tracking System</p>
          </div>
          <h3>Secure Portal</h3>
        </div>
        <div className="landing__heading">
          <div className="landing__heading landing__heading_1">
            <h1 className="landing__heading-h1">Welcome to PACTS</h1>
            <img
              src={logo}
              alt="Pacts Logo"
              className="landing__heading-image"
            />
          </div>
          <h2 className="landing__heading-h2">
            Passport and Citizenship Application Tracking System
          </h2>
          <p className="landing__heading-p">
            Securely track your application or access the staff management
            portal.
          </p>
        </div>

        <div className="landing__portals">
          <section className="landing__card">
            <h3>Applicant Login</h3>
            <p className="landing__heading-p">
              View your application status and receive important updates.
            </p>
            <Link className="landing__card-a" to="/login">
              Applicant Login
            </Link>
          </section>

          <section className="landing__card">
            <h3>Staff Portal</h3>
            <p className="landing__heading-p">
              Manage applications and update applicant progress.
            </p>
            <Link className="landing__card-a" to="/admin-dashboard">
              Staff Portal
            </Link>
          </section>
        </div>

        <p className="landing__security">Secure access for authorized users.</p>
      </div>
    </main>
  );
}

export default LandingPage;

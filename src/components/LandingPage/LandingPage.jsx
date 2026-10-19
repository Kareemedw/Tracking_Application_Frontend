import { Link } from "react-router-dom";
import "./LandingPage.css";

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
          <h1>Welcome to PACTS</h1>
          <h2>Passport and Citizenship Application Tracking System</h2>
          <p>
            Securely track your application or access the staff management
            portal.
          </p>
        </div>

        <div className="landing__portals">
          <section className="landing__card">
            <h3>Applicant Portal</h3>
            <p>View your application status and receive important updates.</p>
            <Link to="/customer-dashboard/6ad3b1d19581ff216c169d7b">
              Applicant Dashboard
            </Link>
          </section>

          <section className="landing__card">
            <h3>Staff Portal</h3>
            <p>Manage applications and update applicant progress.</p>
            <Link to="/admin-dashboard">Staff Portal</Link>
          </section>
        </div>

        <p className="landing__security">Secure access for authorized users.</p>
      </div>
    </main>
  );
}

export default LandingPage;

import { NavLink } from "react-router-dom";
import "./DataAndRecords.css";

function DataAndRecords({ applicants = [] }) {
  const totalApplicants = applicants.length;

  const processingApplicants = applicants.filter(
    (applicant) => applicant.applicationStatus === "processing",
  );

  const actionRequiredApplicants = applicants.filter(
    (applicant) => applicant.applicationStatus === "actionRequired",
  );

  const completedApplicants = applicants.filter(
    (applicant) => applicant.applicationStatus === "approved",
  );

  const notStartedApplicants = applicants.filter(
    (applicant) => applicant.applicationStatus === "stageNotStarted",
  );

  const ongoingApplicants =
    processingApplicants.length + actionRequiredApplicants.length;

  const processingPercentage = ongoingApplicants
    ? (processingApplicants.length / ongoingApplicants) * 100
    : 0;

  const actionRequiredPercentage = ongoingApplicants
    ? (actionRequiredApplicants.length / ongoingApplicants) * 100
    : 0;

  const completedPercentage = totalApplicants
    ? (completedApplicants.length / totalApplicants) * 100
    : 0;

  const ongoingApplicantsPercentage = totalApplicants
    ? (ongoingApplicants / totalApplicants) * 100
    : 0;

  return (
    <main className="records">
      <div className="admin__header">
        <h1 className="admin__header-title">
          Mission: Application Management Portal - Data and Records
        </h1>

        <NavLink className="applicant__nav-link" to="/admin-dashboard">
          Admin Dashboard
        </NavLink>
      </div>

      <section className="records__container">
        <h2 className="records__title">Application Statistics</h2>

        <div className="records__grid">
          <div className="records__card">
            <h3 className="records__card-title">Total Applicants</h3>
            <p className="records__card-value">{totalApplicants}</p>
          </div>

          <div className="records__card">
            <h3 className="records__card-title">Ongoing Applications</h3>
            <p className="records__card-value">{ongoingApplicants}</p>
          </div>

          <div className="records__card">
            <h3 className="records__card-title">Completed Applications</h3>
            <p className="records__card-value">{completedApplicants.length}</p>
          </div>

          <div className="records__card">
            <h3 className="records__card-title">Applications Not Started</h3>
            <p className="records__card-value">{notStartedApplicants.length}</p>
          </div>
        </div>

        <section className="records__breakdown">
          <h2 className="records__title">Applications Breakdown</h2>
          <div className="records__grid">
            <div className="records__card records__card_status_ongoing">
              <h3 className="records__card-title">Ongoing</h3>

              <p className="records__card-value">{ongoingApplicants}</p>

              <h4 className="records__card-description">
                {ongoingApplicantsPercentage.toFixed(1)}% of all applications
              </h4>
            </div>

            <div className="records__card records__card_status_completed">
              <h3 className="records__card-title">Completed</h3>

              <p className="records__card-value">
                {completedApplicants.length}
              </p>

              <h4 className="records__card-description">
                {completedPercentage.toFixed(1)}% of all applications
              </h4>
            </div>
          </div>

          <div
            className="records__progress"
            role="img"
            aria-label={`Ongoing applications: ${processingApplicants.length} processing and ${actionRequiredApplicants.length} requiring action`}
          >
            <div
              className="records__total"
              style={{ width: `${ongoingApplicantsPercentage}%` }}
            />
            <div
              className="records__progress-completed"
              style={{ width: `${completedPercentage}%` }}
            />
          </div>

          <div className="records__breakdown records__breakdown-ongoing">
            <h2 className="records__title">Ongoing Applications Breakdown</h2>

            <div className="records__grid">
              <div className="records__card records__card_status_processing">
                <h3 className="records__card-title">Processing</h3>

                <p className="records__card-value">
                  {processingApplicants.length}
                </p>

                <h4 className="records__card-description">
                  {processingPercentage.toFixed(1)}% of ongoing applications
                </h4>
              </div>

              <div className="records__card records__card_status_actionRequired">
                <h3 className="records__card-title">Action Required</h3>

                <p className="records__card-value">
                  {actionRequiredApplicants.length}
                </p>

                <h4 className="records__card-description">
                  {actionRequiredPercentage.toFixed(1)}% of ongoing applications
                </h4>
              </div>
            </div>

            <div
              className="records__progress"
              role="img"
              aria-label={`Ongoing applications: ${processingApplicants.length} processing and ${actionRequiredApplicants.length} requiring action`}
            >
              <div
                className="records__progress-processing"
                style={{ width: `${processingPercentage}%` }}
              />

              <div
                className="records__progress-action"
                style={{ width: `${actionRequiredPercentage}%` }}
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default DataAndRecords;

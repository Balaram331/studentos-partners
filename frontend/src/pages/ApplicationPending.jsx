import "../styles/ApplicationPending.css";

function ApplicationPending() {
  return (
    <div className="pending-page">
      <main className="pending-card">
        <div className="pending-icon">
          ✓
        </div>

        <span className="pending-eyebrow">
          Application received
        </span>

        <h1>
          Your application is under review.
        </h1>

        <p>
          Thanks for applying to the StudentOS Partner
          Program. Our team will review your application
          and update your status soon.
        </p>

        <div className="pending-status">
          <span></span>
          Pending review
        </div>
      </main>
    </div>
  );
}

export default ApplicationPending;
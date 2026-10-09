import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

import {
  getApplications,
  approveApplication,
  rejectApplication,
} from "../services/api";

import "../styles/AdminDashboard.css";


function AdminDashboard() {
  const [applications, setApplications] =
    useState([]);

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);


  /* =========================
     LOAD APPLICATIONS
  ========================= */

  useEffect(() => {
    let mounted = true;

    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await getApplications();

        const data = (
          result.applications || []
        ).map((application) => ({
          id:
            application.application_id ||
            application.id,

          ...application,
        }));

        if (mounted) {
          setApplications(data);
        }

      } catch (error) {
        console.error(
          "Load applications error:",
          error
        );

        if (mounted) {
          setError(
            error.message ||
              "Unable to load applications."
          );
        }

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };


    /*
      IMPORTANT:

      Wait for Firebase to restore
      the logged-in admin session
      before calling the backend.
    */

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          if (!user) {
            if (mounted) {
              setLoading(false);
              setError(
                "User is not logged in"
              );
            }

            return;
          }

          console.log(
            "ADMIN FIREBASE USER:",
            user.email,
            user.uid
          );

          await loadApplications();
        }
      );


    return () => {
      mounted = false;
      unsubscribe();
    };

  }, []);


  /* =========================
     APPROVE
  ========================= */

  const handleApprove = async () => {
    if (!selectedApplication) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      const applicationId =
        selectedApplication.id;

      await approveApplication(
        applicationId
      );


      /*
        Update list locally
        after successful backend update.
      */

      setApplications(
        (previous) =>
          previous.map(
            (application) =>
              application.id ===
              applicationId
                ? {
                    ...application,
                    status:
                      "approved",
                  }
                : application
          )
      );


      /*
        Update selected application.
      */

      setSelectedApplication(
        (previous) =>
          previous
            ? {
                ...previous,
                status:
                  "approved",
              }
            : null
      );

    } catch (error) {
      console.error(
        "Approve application error:",
        error
      );

      setError(
        error.message ||
          "Unable to approve application."
      );

    } finally {
      setActionLoading(false);
    }
  };


  /* =========================
     REJECT
  ========================= */

  const handleReject = async () => {
    if (!selectedApplication) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      const applicationId =
        selectedApplication.id;

      await rejectApplication(
        applicationId
      );


      /*
        Update list locally.
      */

      setApplications(
        (previous) =>
          previous.map(
            (application) =>
              application.id ===
              applicationId
                ? {
                    ...application,
                    status:
                      "rejected",
                  }
                : application
          )
      );


      /*
        Update selected application.
      */

      setSelectedApplication(
        (previous) =>
          previous
            ? {
                ...previous,
                status:
                  "rejected",
              }
            : null
      );

    } catch (error) {
      console.error(
        "Reject application error:",
        error
      );

      setError(
        error.message ||
          "Unable to reject application."
      );

    } finally {
      setActionLoading(false);
    }
  };


  /* =========================
     UI
  ========================= */

  return (
    <div className="admin-page">

      {/* Navigation */}

      <nav className="admin-nav">

        <div className="brand">
          <span className="brand-dot"></span>

          StudentOS
        </div>


        <div className="admin-nav-right">

          <span>
            Partner Program
          </span>

          <div className="admin-avatar">
            A
          </div>

        </div>

      </nav>


      {/* Main */}

      <main className="admin-main">

        {/* Header */}

        <div className="admin-header">

          <div>

            <span className="admin-eyebrow">
              ADMIN
            </span>

            <h1>
              Applications
            </h1>

            <p>
              Review StudentOS Ambassador
              applications.
            </p>

          </div>


          <div className="application-count">

            <strong>
              {applications.length}
            </strong>

            <span>
              Total applications
            </span>

          </div>

        </div>


        {/* Error */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* Loading */}

        {loading && (
          <div className="admin-state">
            Loading applications...
          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          applications.length === 0 && (

            <div className="admin-state">

              <h3>
                No applications yet
              </h3>

              <p>
                New Ambassador applications
                will appear here.
              </p>

            </div>
          )}


        {/* Applications */}

        {!loading &&
          applications.length > 0 && (

            <div className="applications-container">

              <div className="applications-toolbar">

                <div className="toolbar-title">
                  All applications
                </div>

                <div className="toolbar-filter">
                  All
                </div>

              </div>


              <div className="applications-list">

                {applications.map(
                  (application) => (

                    <button
                      type="button"
                      className="application-item"
                      key={application.id}
                      disabled={actionLoading}

                      /*
                        IMPORTANT:

                        Clicking an application
                        ONLY opens details.

                        It does NOT approve.
                      */

                      onClick={() => {
                        setSelectedApplication(
                          application
                        );

                        setError("");
                      }}
                    >

                      <div className="applicant-info">

                        <div className="applicant-avatar">

                          {application.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "?"}

                        </div>


                        <div>

                          <strong>
                            {application.name ||
                              "Unnamed applicant"}
                          </strong>

                          <span>
                            {application.email}
                          </span>

                        </div>

                      </div>


                      <div className="application-college">

                        <span>
                          College
                        </span>

                        <strong>
                          {application.college ||
                            "—"}
                        </strong>

                      </div>


                      <div className="application-role">

                        <span>
                          Role
                        </span>

                        <strong>
                          {application.role ||
                            "Ambassador"}
                        </strong>

                      </div>


                      <div>

                        <span
                          className={`status-badge ${
                            application.status ||
                            "pending"
                          }`}
                        >
                          {application.status ||
                            "pending"}
                        </span>

                      </div>


                      <span className="application-arrow">
                        →
                      </span>

                    </button>

                  )
                )}

              </div>

            </div>
          )}

      </main>


      {/* Application Details */}

      {selectedApplication && (

        <div
          className="details-overlay"

          onClick={() =>
            setSelectedApplication(null)
          }
        >

          <div
            className="details-panel"

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Header */}

            <div className="details-header">

              <div>

                <span>
                  APPLICATION
                </span>

                <h2>
                  {selectedApplication.name ||
                    "Unnamed applicant"}
                </h2>

              </div>


              <button
                type="button"
                className="close-details"

                onClick={() =>
                  setSelectedApplication(null)
                }
              >
                ×
              </button>

            </div>


            {/* Status */}

            <div className="details-status">

              <span
                className={`status-badge ${
                  selectedApplication.status ||
                  "pending"
                }`}
              >
                {selectedApplication.status ||
                  "pending"}
              </span>

            </div>


            {/* Personal Information */}

            <div className="details-section">

              <h3>
                Personal information
              </h3>


              <div className="details-grid">

                <div>

                  <span>
                    Name
                  </span>

                  <strong>
                    {selectedApplication.name ||
                      "—"}
                  </strong>

                </div>


                <div>

                  <span>
                    Email
                  </span>

                  <strong>
                    {selectedApplication.email ||
                      "—"}
                  </strong>

                </div>


                <div>

                  <span>
                    Phone
                  </span>

                  <strong>
                    {selectedApplication.phone ||
                      "—"}
                  </strong>

                </div>


                <div>

                  <span>
                    City
                  </span>

                  <strong>
                    {selectedApplication.city ||
                      "—"}
                  </strong>

                </div>

              </div>

            </div>


            {/* Education */}

            <div className="details-section">

              <h3>
                Education
              </h3>


              <div className="details-grid">

                <div>

                  <span>
                    College
                  </span>

                  <strong>
                    {selectedApplication.college ||
                      "—"}
                  </strong>

                </div>


                <div>

                  <span>
                    Course
                  </span>

                  <strong>
                    {selectedApplication.course ||
                      "—"}
                  </strong>

                </div>


                <div>

                  <span>
                    Year
                  </span>

                  <strong>
                    {selectedApplication.year ||
                      "—"}
                  </strong>

                </div>

              </div>

            </div>


            {/* Online Presence */}

            <div className="details-section">

              <h3>
                Online presence
              </h3>


              <div className="details-links">

                <span>
                  Instagram:{" "}
                  {selectedApplication.instagram ||
                    "Not provided"}
                </span>


                <span>
                  LinkedIn:{" "}
                  {selectedApplication.linkedin ||
                    "Not provided"}
                </span>


                <span>
                  YouTube:{" "}
                  {selectedApplication.youtube ||
                    "Not provided"}
                </span>

              </div>

            </div>


            {/* Reason */}

            <div className="details-section">

              <h3>
                Why StudentOS?
              </h3>


              <p className="application-reason">

                {selectedApplication.reason ||
                  "No response provided."}

              </p>

            </div>


            {/* Actions */}

            {selectedApplication.status ===
              "pending" && (

              <div className="details-actions">

                <button
                  type="button"
                  className="reject-btn"

                  onClick={handleReject}

                  disabled={actionLoading}
                >
                  {actionLoading
                    ? "Processing..."
                    : "Reject"}
                </button>


                <button
                  type="button"
                  className="approve-btn"

                  onClick={handleApprove}

                  disabled={actionLoading}
                >
                  {actionLoading
                    ? "Processing..."
                    : "Approve"}
                </button>

              </div>
            )}


            {/* Already processed */}

            {selectedApplication.status ===
              "approved" && (

              <div className="details-actions">

                <div className="admin-state">
                  Application approved.
                </div>

              </div>
            )}


            {selectedApplication.status ===
              "rejected" && (

              <div className="details-actions">

                <div className="admin-state">
                  Application rejected.
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}


export default AdminDashboard;
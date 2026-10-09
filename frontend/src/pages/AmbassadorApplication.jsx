import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { submitApplication } from "../services/api";

import "../styles/AmbassadorApplication.css";


function AmbassadorApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    college: "",
    course: "",
    year: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await submitApplication({
        email: user.email,
        role: "ambassador",

        name: formData.name,
        phone: formData.phone,
        city: formData.city,

        college: formData.college,
        course: formData.course,
        year: formData.year,

        instagram: formData.instagram,
        linkedin: formData.linkedin,
        youtube: formData.youtube,

        reason: formData.reason,
      });

      navigate("/application");

    } catch (error) {
      console.error(
        "Application submit error:",
        error
      );

      setError(
        error.message ||
        "Unable to submit your application. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="application-page">

      <nav className="application-nav">

        <div className="brand">
          <span className="brand-dot"></span>
          StudentOS
        </div>

        <span className="application-nav-text">
          Ambassador Application
        </span>

      </nav>


      <main className="application-main">

        <div className="application-container">

          <div className="application-header">

            <span className="application-eyebrow">
              StudentOS Partners
            </span>

            <h1>
              Become an Ambassador
            </h1>

            <p>
              Tell us a little about yourself.
              Your application will be reviewed
              by the StudentOS team.
            </p>

          </div>


          <form
            className="application-form"
            onSubmit={handleSubmit}
          >

            {/* Personal Information */}

            <section className="form-section">

              <div className="section-title">
                <span>01</span>
                <h2>Personal information</h2>
              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label htmlFor="name">
                    Full name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="phone">
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                  />

                </div>


                <div className="form-group full-width">

                  <label htmlFor="city">
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    required
                  />

                </div>

              </div>

            </section>


            {/* Education */}

            <section className="form-section">

              <div className="section-title">
                <span>02</span>
                <h2>Education</h2>
              </div>


              <div className="form-grid">

                <div className="form-group full-width">

                  <label htmlFor="college">
                    College / Institution
                  </label>

                  <input
                    id="college"
                    name="college"
                    type="text"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="College or institution name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="course">
                    Course
                  </label>

                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech CSE"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="year">
                    Year
                  </label>

                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select year
                    </option>

                    <option value="1">
                      1st Year
                    </option>

                    <option value="2">
                      2nd Year
                    </option>

                    <option value="3">
                      3rd Year
                    </option>

                    <option value="4">
                      4th Year
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

            </section>


            {/* Online Presence */}

            <section className="form-section">

              <div className="section-title">
                <span>03</span>
                <h2>Online presence</h2>
              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label htmlFor="instagram">
                    Instagram
                    <span>Optional</span>
                  </label>

                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@username"
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="linkedin">
                    LinkedIn
                    <span>Optional</span>
                  </label>

                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn profile URL"
                  />

                </div>


                <div className="form-group full-width">

                  <label htmlFor="youtube">
                    YouTube
                    <span>Optional</span>
                  </label>

                  <input
                    id="youtube"
                    name="youtube"
                    type="url"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="YouTube channel URL"
                  />

                </div>

              </div>

            </section>


            {/* About */}

            <section className="form-section">

              <div className="section-title">
                <span>04</span>
                <h2>About you</h2>
              </div>


              <div className="form-group">

                <label htmlFor="reason">
                  Why do you want to become a
                  StudentOS Ambassador?
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us about yourself, your interests, and how you can help StudentOS reach more students."
                  required
                />

              </div>

            </section>


            {/* Error */}

            {error && (
              <div className="application-error">
                {error}
              </div>
            )}


            {/* Submit */}

            <div className="application-submit">

              <p>
                By submitting this application,
                you agree to provide accurate
                information.
              </p>


              <button
                type="submit"
                className="submit-application"
                disabled={loading}
              >

                {loading
                  ? "Submitting..."
                  : "Submit Application"}

                {!loading && (
                  <span>→</span>
                )}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}


export default AmbassadorApplication;
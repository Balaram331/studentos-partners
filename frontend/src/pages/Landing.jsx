import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">

      {/* =========================
          NAVIGATION
      ========================== */}
      <nav className="landing-nav">
        <div className="brand">
          <span className="brand-dot"></span>
          StudentOS
        </div>

        <button
          className="login-btn"
          onClick={goToLogin}
        >
          Login
        </button>
      </nav>


      {/* =========================
          HERO
      ========================== */}
      <main className="hero">
        <div className="hero-content">

          <div className="eyebrow">
            StudentOS Partner Program
          </div>

          <h1>
            Help students.
            <br />
            <span>Grow with StudentOS.</span>
          </h1>

          <p>
            Join the StudentOS partner community, help
            students discover better learning tools, and
            grow with the impact you create.
          </p>

          <button
            className="primary-btn"
            onClick={goToLogin}
          >
            Become a Partner
            <span>→</span>
          </button>

        </div>


        {/* Partner Preview */}
        <div className="hero-card">

          <div className="card-label">
            YOUR PARTNER PROFILE
          </div>

          <div className="profile-row">

            <div className="avatar">
              P
            </div>

            <div>
              <h3>
                StudentOS Ambassador
              </h3>

              <p>
                Partner profile preview
              </p>
            </div>

          </div>

          <div className="stats">

            <div>
              <strong>—</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>—</strong>
              <span>Paid users</span>
            </div>

            <div>
              <strong>—</strong>
              <span>Earned</span>
            </div>

          </div>

        </div>
      </main>


      {/* =========================
          ABOUT STUDENTOS
      ========================== */}
      <section className="about-section">

        <div className="section-heading">
          <span>01</span>
          <h2>
            What is StudentOS?
          </h2>
        </div>

        <div className="about-grid">

          <div className="about-text">

            <p>
              StudentOS is an AI-powered platform built
              to help students go from learning something
              to actually building a career around it.
            </p>

            <p>
              Students can discover the best learning
              resources, understand what they should learn
              next, build relevant projects, prepare for
              interviews, and work towards becoming
              industry-ready — all through one platform.
            </p>

            <p>
              Instead of jumping between dozens of websites,
              videos, articles, GitHub repositories, and
              documentation, StudentOS helps bring the
              right resources and direction together.
            </p>

          </div>


          <div className="site-link-box">

            <span>
              EXPLORE STUDENTOS
            </span>

            <h3>
              Your journey starts here.
            </h3>

            <p>
              Explore the main StudentOS platform and
              see how we are building a smarter way for
              students to learn, build, and prepare
              for their careers.
            </p>

            <a
              className="site-link"
              href="https://studentos.co.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit studentos.co.in
              <span>↗</span>
            </a>

          </div>

        </div>
      </section>


      {/* =========================
          HOW STUDENTOS WORKS
      ========================== */}
      <section className="platform-section">

        <div className="section-heading">
          <span>02</span>
          <h2>
            From learning to industry-ready.
          </h2>
        </div>

        <div className="platform-intro">

          <p>
            Students often know what they want to achieve,
            but not what to learn, where to learn it,
            what to build, or how to prepare for the
            real world.
          </p>

          <p>
            StudentOS uses AI to help turn that uncertainty
            into a practical path.
          </p>

        </div>


        <div className="platform-grid">

          {/* Search */}
          <div className="platform-card">

            <span className="platform-number">
              01
            </span>

            <div className="platform-icon">
              ⌕
            </div>

            <h3>
              Find the right resources
            </h3>

            <p>
              Search across useful learning content and
              discover relevant videos, articles, GitHub
              repositories, documentation, and other
              resources without wasting hours searching
              across the internet.
            </p>

          </div>


          {/* Roadmap */}
          <div className="platform-card">

            <span className="platform-number">
              02
            </span>

            <div className="platform-icon">
              ↗
            </div>

            <h3>
              Get a personalized roadmap
            </h3>

            <p>
              Tell StudentOS what you want to achieve.
              AI can help create a learning direction
              based on your goals, helping you understand
              what to learn and what to focus on next.
            </p>

          </div>


          {/* Projects */}
          <div className="platform-card">

            <span className="platform-number">
              03
            </span>

            <div className="platform-icon">
              ◇
            </div>

            <h3>
              Know what to build
            </h3>

            <p>
              Learning alone is not enough. StudentOS
              helps students move from concepts to
              practical projects so they can actually
              apply what they learn and build a portfolio.
            </p>

          </div>


          {/* Career */}
          <div className="platform-card">

            <span className="platform-number">
              04
            </span>

            <div className="platform-icon">
              →
            </div>

            <h3>
              Prepare for the real world
            </h3>

            <p>
              Continue beyond projects with resume support,
              interview preparation, career guidance, and
              practical preparation designed to help
              students become more industry-ready.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          AI JOURNEY
      ========================== */}
      <section className="journey-section">

        <div className="section-heading">
          <span>03</span>
          <h2>
            One journey. Clear direction.
          </h2>
        </div>

        <div className="journey-card">

          <div className="journey-item">
            <span>01</span>
            <h3>
              Goal
            </h3>
            <p>
              Start with what you want to achieve.
            </p>
          </div>

          <div className="journey-arrow">
            →
          </div>

          <div className="journey-item">
            <span>02</span>
            <h3>
              Learn
            </h3>
            <p>
              Discover what you actually need to learn.
            </p>
          </div>

          <div className="journey-arrow">
            →
          </div>

          <div className="journey-item">
            <span>03</span>
            <h3>
              Build
            </h3>
            <p>
              Turn knowledge into real projects.
            </p>
          </div>

          <div className="journey-arrow">
            →
          </div>

          <div className="journey-item">
            <span>04</span>
            <h3>
              Prepare
            </h3>
            <p>
              Build your resume and prepare for interviews.
            </p>
          </div>

          <div className="journey-arrow">
            →
          </div>

          <div className="journey-item">
            <span>05</span>
            <h3>
              Grow
            </h3>
            <p>
              Move closer to your career goals.
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          PARTNER ROLE
      ========================== */}
      <section className="roles-section">

        <div className="section-heading">
          <span>04</span>
          <h2>
            Become part of the journey.
          </h2>
        </div>

        <div className="role-card">

          <div className="role-icon">
            A
          </div>

          <div className="role-info">

            <h3>
              Ambassador
            </h3>

            <p>
              Represent StudentOS, introduce students
              to useful resources and opportunities,
              and help us reach more students who need
              better direction.
            </p>

          </div>

          <button
            className="role-arrow"
            onClick={goToLogin}
            aria-label="Continue as Ambassador"
          >
            →
          </button>

        </div>

      </section>


      {/* =========================
          SUPPORT / FUNDING
      ========================== */}
      <section className="funding-section">

        <div className="funding-card">

          <div>

            <span className="card-eyebrow">
              SUPPORT STUDENTOS
            </span>

            <h2>
              Want to support what we are building?
            </h2>

            <p>
              If you believe in our mission and want to
              contribute beyond the partner program,
              there will be opportunities to support
              StudentOS and become part of our journey.
            </p>

          </div>

          <button
            className="funding-button"
            type="button"
          >
            Coming Soon
          </button>

        </div>

      </section>


      {/* =========================
          MISSION
      ========================== */}
      <section className="help-section">

        <div className="section-heading">
          <span>05</span>
          <h2>
            Why we are building this.
          </h2>
        </div>

        <div className="help-grid">

          <div className="help-card">

            <span className="help-number">
              01
            </span>

            <h3>
              Less searching
            </h3>

            <p>
              Students should not have to spend hours
              searching through countless platforms just
              to find one useful resource.
            </p>

          </div>


          <div className="help-card">

            <span className="help-number">
              02
            </span>

            <h3>
              More direction
            </h3>

            <p>
              Knowing what to learn next can be just as
              important as having access to learning
              material. AI can help make that path clearer.
            </p>

          </div>


          <div className="help-card">

            <span className="help-number">
              03
            </span>

            <h3>
              Learning that leads somewhere
            </h3>

            <p>
              The goal is not simply to consume courses
              and content. Students should be able to
              learn, build, prepare, and move towards
              real opportunities.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================== */}
      <section className="final-cta">

        <span className="card-eyebrow">
          STUDENTOS PARTNER PROGRAM
        </span>

        <h2>
          Help more students
          <br />
          move forward.
        </h2>

        <p>
          Become a StudentOS Ambassador and help us
          bring better learning, direction, and
          opportunities to more students.
        </p>

        <button
          className="primary-btn"
          onClick={goToLogin}
        >
          Become a Partner
          <span>→</span>
        </button>

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="landing-footer">

        <p>
          © {new Date().getFullYear()} StudentOS.
          Built for students.
        </p>

        <a
          className="footer-link"
          href="https://studentos.co.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          studentos.co.in ↗
        </a>

      </footer>

    </div>
  );
}

export default Landing;
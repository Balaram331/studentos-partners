import { useNavigate } from "react-router-dom";
import "../styles/RoleSelection.css";

function RoleSelection() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    if (role === "ambassador") {
      navigate("/apply");
    }
  };

  return (
    <div className="role-selection-page">

      <nav className="role-selection-nav">
        <div className="brand">
          <span className="brand-dot"></span>
          StudentOS
        </div>

        <span>Partner Portal</span>
      </nav>

      <main className="role-selection-main">

        <div className="role-selection-header">
          <span>StudentOS Partners</span>

          <h1>Choose your role</h1>

          <p>
            Select how you would like to contribute
            to StudentOS.
          </p>
        </div>

        <div className="available-roles">

          <button
            className="selection-role-card"
            onClick={() => selectRole("ambassador")}
          >
            <div className="selection-role-icon">
              A
            </div>

            <div className="selection-role-info">
              <h3>Ambassador</h3>

              <p>
                Help students discover StudentOS
                and grow the community.
              </p>
            </div>

            <span className="selection-role-arrow">
              →
            </span>
          </button>

        </div>

      </main>

    </div>
  );
}

export default RoleSelection;
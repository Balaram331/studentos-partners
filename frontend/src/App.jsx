import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import AmbassadorApplication from "./pages/AmbassadorApplication";
import ApplicationPending from "./pages/ApplicationPending";
import AdminDashboard from "./pages/AdminDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/roles"
          element={<RoleSelection />}
        />

        <Route
          path="/apply"
          element={<AmbassadorApplication />}
        />

        <Route
          path="/application"
          element={<ApplicationPending />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/partner"
          element={<PartnerDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
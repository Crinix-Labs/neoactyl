import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Loginform from "./pages/Loginform";
import Nopage from "./pages/404";
import Dashboard from "./pages/Dashboard"; // Example protected page
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Loginform />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
}

export default App;

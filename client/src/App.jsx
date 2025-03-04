import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loginform from "./pages/Loginform";

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

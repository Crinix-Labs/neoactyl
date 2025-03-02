import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Loginform from "./pages/Loginform";
import Nopage from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Loginform />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
}

export default App;

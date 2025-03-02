import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Loginform from "./pages/Loginform";

function App() {
  return (
    <div className="flex justify-center items-center w-100vw h-100vh flex-col">
  <a href="/" className="link">Main (Done)</a>
  <a href="/auth" className="link">login (Done)</a>
  <a href="/dashboard" className="link">User Dashboard (Pending) </a>
  <a href="/admin/config" className="link">Admin Dash (Pending)</a>
    </div>
  );
}

export default App;

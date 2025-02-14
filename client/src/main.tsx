import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import Dashboard from "./pages/DashboardPage"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Dashboard />
  </React.StrictMode>,
)


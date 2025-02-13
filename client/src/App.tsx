import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ServerControlPanel from "./pages/ServerControlPanel"
import SettingsPage from "./pages/SettingsPage"
import AdminPage from "./pages/AdminPage"
import UserManagementPage from "./pages/UserManagementPage"
import ShopPage from "./pages/ShopPage"
import AfkPage from "./pages/AfkPage"
import LinkvertisePage from "./pages/LinkvertisePage"
import CreateServerPage from "./pages/CreateServerPage"
import EggsManagementPage from "./pages/EggsManagementPage"
import NodeManagementPage from "./pages/NodeManagementPage"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/server/:id"
                element={
                  <ProtectedRoute>
                    <ServerControlPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UserManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shop"
                element={
                  <ProtectedRoute>
                    <ShopPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/afk"
                element={
                  <ProtectedRoute>
                    <AfkPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/linkvertise"
                element={
                  <ProtectedRoute>
                    <LinkvertisePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-server"
                element={
                  <ProtectedRoute>
                    <CreateServerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eggs"
                element={
                  <ProtectedRoute>
                    <EggsManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nodes"
                element={
                  <ProtectedRoute>
                    <NodeManagementPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

